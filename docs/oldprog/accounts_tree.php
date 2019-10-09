<?php 
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
		 	$node->setURL(sprintf("javascript:alert(\"%s\");", $code));
		
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

printf("<script type=\"text/javascript\" src=\"%s/treeview.js\"></script>\n", TREEVIEW_LIB_PATH);

$rootAttributes = array("code"=>"124b2ad3633e2b6c8ff26505730c09a7");
$treeID = "accounts_tree";
$tv = DBTreeView::createTreeView(
		$rootAttributes,
		TREEVIEW_LIB_PATH, 
		$treeID);
echo $tv->sprintTreeViewScript();

