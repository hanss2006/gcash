	<option value="cf9b4a026b99ba7ca0a7c873a7e34b91">Выбрать...</option>
<?php
require_once "connect.php";
//<label for="combobox">Счет: </label>
//<select id="account">


$account_type = "'EXPENSE'";

switch ($_REQUEST ["account_type"]){
	case "INCOME":
		$account_type = "'ASSET', 'BANK', 'INCOME', 'CASH'";
		break;
};

// Accounts list
$sql = "SELECT
guid,
name
FROM gnucash.accounts
WHERE account_type IN ($account_type) AND !placeholder AND commodity_scu = 100
ORDER BY name";

$result = $dbh->query($sql);
foreach ( $result->fetchAll(PDO::FETCH_ASSOC) as $account){
	echo '<option value="' . $account['guid'] . '">' . $account['name'] . '</option>';
}
//</select>
?>
