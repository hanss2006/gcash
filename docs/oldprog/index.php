<?php 
require_once "connect.php";
require_once 'pager.php';
require_once 'auth.php';





/*
 * Печатаем дерево счетов
 */
define("TREEVIEW_LIB_PATH","./dbtreeview");
require_once(TREEVIEW_LIB_PATH . '/dbtreeview.php');

class MyHandler implements RequestHandler{

	//using 2 attribute : id=0, 1, 2, 3   root=1

	public function handleChildrenRequest(ChildrenRequest $req){
		$dsn = 'mysql:host=localhost;dbname=gnucash';
		$username = 'cash';
		$password = 'cash123';
		$options = array(
				PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
		);

		$dbh = new PDO($dsn, $username, $password, $options);


		$attributes = $req->getAttributes();

		if(!isset($attributes['code'])){
			die("error: attribute code not given");
		}
		$parentCode = $attributes['code'];
		//require_once ('connect.php');

		// In our example, the table ‘mytable’ contains records with the fields ‘code’, ‘description’, and ‘parent’.
		$query = sprintf ( "SELECT * FROM accounts WHERE parent_guid='%s'", mysql_escape_string ( $parentCode ) );

		$result = $dbh->query ( $query ) or die ( 'Query failed: ' . mysql_error () );

		$nodes=array();


		foreach ( $result->fetchAll ( PDO::FETCH_ASSOC ) as $line ) {
			$code = $line["guid"];
			$text = $line["name"];

			$node = DBTreeView::createTreeNode(	$text, array("code"=>$code));
			$node->setURL(sprintf("javascript:click_tree(\"%s\");", $code));

			//has children
			$query2 = sprintf("SELECT * FROM accounts WHERE parent_guid='%s' LIMIT 1",	mysql_escape_string($code));

			$result2 = $dbh->query($query2) or die("Query failed");
			if(!$result2->fetch()){
				//no children
				$node->setHasChildren(false);
				$node->setClosedIcon("images/doc.gif");
			}
			$nodes[] = $node;
		}

		$response = DBTreeView::createChildrenResponse($nodes);
		return $response;
	}
} //class TestListener

try{
	DBTreeView::processRequest(new MyHandler());
}catch(Exception $e){
	echo("Error:". $e->getMessage());
}

$rootAttributes = array("code"=>"124b2ad3633e2b6c8ff26505730c09a7");
$treeID = "accounts_tree";
$tv = DBTreeView::createTreeView(
		$rootAttributes,
		TREEVIEW_LIB_PATH,
		$treeID);
$tree =  $tv->sprintTreeViewScript();










// Формируем страницу
$username = $data['username'];
$current_account = '';

if (isset($_REQUEST ["current_account"]))
{
	$current_account = $_REQUEST ["current_account"];
} else {
	$current_account = $users[$data['username']]["cashaccount"];
}


$account_type = "EXPENSE";
$local_tz = "Europe/Moscow";

$page = 1;
if (isset($_REQUEST ["page"]))
{
	$page = $_REQUEST ["page"]?intval($_REQUEST["page"]):1;
}

// Number of posting
$query = "SELECT
  COUNT(*) AS num
FROM splits
  WHERE account_guid = '$current_account'";

$result = $dbh->query ( $query ) or die ( 'Query failed: ' . mysql_error () );
$total_rows = $result->fetchColumn ();
$pager = new Pager($total_rows, "index.php", $page, $current_account);

// Transactions list
$transactions = array();
$sql = "SELECT
  transactions.guid AS guid,
  transactions.description,
  DATE_FORMAT(CONVERT_TZ(transactions.post_date,'GMT','$local_tz'), '%d.%m.%Y') AS enter_date,
  ROUND(t1.quantity_num / t1.quantity_denom, 2) AS value_num,
  t2.cred_acc
FROM transactions
  INNER JOIN (SELECT
      splits.tx_guid,
      MAX(splits.account_guid) AS cred_acc,
      SUM(splits.value_num / splits.quantity_denom) AS cred_value
    FROM splits
    WHERE splits.account_guid <> '$current_account'
    GROUP BY splits.tx_guid) t2
    ON transactions.guid = t2.tx_guid
  INNER JOIN splits t1
    ON transactions.guid = t1.tx_guid
WHERE t1.account_guid = '$current_account'
ORDER BY transactions.post_date DESC, enter_date DESC LIMIT ".(($page-1)*POSTS_PER_PAGE)." ,".POSTS_PER_PAGE;
$result = $dbh->query($sql);
foreach ( $result->fetchAll(PDO::FETCH_ASSOC) as $transaction){
	$transaction['editable'] = (substr($transaction['guid'], 0, 4) == "0000");  
	$transactions[] = $transaction;
}

// Accounts list
$sql = "SELECT
  guid,
  name
FROM gnucash.accounts
WHERE account_type = '$account_type' AND !placeholder
ORDER BY name";

$result = $dbh->query($sql);
foreach ( $result->fetchAll(PDO::FETCH_ASSOC) as $account){
	$accounts[] = $account;
}

// Total by account
$query = "SELECT
  ROUND(SUM(quantity_num / quantity_denom), 2) AS total_by_current
FROM splits
WHERE account_guid = '$current_account'";

$result = $dbh->query ( $query ) or die ( 'Query failed: ' . mysql_error () );
$total_by_current = $result->fetchColumn ();

include "transactions.php";
$dbh = null;
