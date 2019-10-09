<?php
require_once "connect.php";

function GUID()
{
	return sprintf('%04x%04x%04x%04x%04x%04x%04x%04x', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}
// current_account = текущий номер счета
// account = корреспондирующий счет
// guid = индентификатор транзакции
// today = дата проводки
// description = комментарии
// value = сумма проводки

if (isset ( $_REQUEST ["current_account"] ) & isset ( $_REQUEST ["account"] ) & isset ( $_REQUEST ["guid"] ) & isset ( $_REQUEST ["today"] ) & isset ( $_REQUEST ["description"] ) & isset ( $_REQUEST ["value"] )) {
	$current_account = $_REQUEST ["current_account"];
	$account = $_REQUEST ["account"];
	$guid = $_REQUEST ["guid"];
	$today = $_REQUEST ["today"];
	$description = $_REQUEST ["description"];
	$value = $_REQUEST ["value"];
	$denom = 100;
	
	$sql = "INSERT INTO gnucash.transactions
		(
			guid
 			,currency_guid
 			,num
			,post_date
			,enter_date
			,description
		)
		VALUES
		(
  			'$guid' -- guid - VARCHAR(32) NOT NULL
 			,'eecd73e9d75ee21ffcc4a773eb9831a8' -- currency_guid - VARCHAR(32) NOT NULL
			,'' -- num - VARCHAR(2048) NOT NULL
 			,'$today' -- post_date - TIMESTAMP
 			, UTC_TIMESTAMP() -- enter_date - TIMESTAMP
 			,'$description' -- description - VARCHAR(2048)
		)";
	try {
		/* Начало транзакции, отключение автоматической фиксации */
		$dbh->beginTransaction();
		$count = $dbh->exec($sql);

		$sql = "INSERT INTO gnucash.splits
		(
 			guid
			,tx_guid
			,account_guid
			,memo
			,action
			,reconcile_state
			,reconcile_date
			,value_num
			,value_denom
			,quantity_num
			,quantity_denom
		)
		VALUES
		(
			  :guid_split -- guid - VARCHAR(32) NOT NULL
			, :guid -- tx_guid - VARCHAR(32) NOT NULL
			, :account -- account_guid - VARCHAR(32) NOT NULL
			, 'webapp' -- memo - VARCHAR(2048) NOT NULL
			, '' -- action - VARCHAR(2048) NOT NULL
			, 'n' -- reconcile_state - VARCHAR(1) NOT NULL
			, NULL
			, :value -- value_num - BIGINT(20) NOT NULL
			, :denom -- value_denom - BIGINT(20) NOT NULL
			, :value -- quantity_num - BIGINT(20) NOT NULL
			, :denom -- quantity_denom - BIGINT(20) NOT NULL
		)";
		$sth = $dbh->prepare($sql);

		$guid_split = GUID();
		$value_ins = $value*$denom;
	
		$sth->bindParam(":guid_split", $guid_split, PDO::PARAM_STR);
		$sth->bindParam(":guid", $guid, PDO::PARAM_STR);
		$sth->bindParam(":account", $current_account, PDO::PARAM_STR);
		$sth->bindParam(":value", $value_ins, PDO::PARAM_INT);
		$sth->bindParam(":denom", $denom, PDO::PARAM_INT);
		$sth->execute();

		$guid_split = GUID();
		$value_ins = -$value*$denom;
	
		$sth->bindParam(":guid_split", $guid_split, PDO::PARAM_STR);
		$sth->bindParam(":guid", $guid, PDO::PARAM_STR);
		$sth->bindParam(":account", $account, PDO::PARAM_STR);
		$sth->bindParam(":value", $value_ins, PDO::PARAM_INT);
		$sth->bindParam(":denom", $denom, PDO::PARAM_INT);
		$sth->execute();
	
		/* Фиксация изменений */
		$dbh->commit();
	} catch (PDOException $e) {
		if ($dbh->isTransactionActive())  // this function does NOT exist
		        $dbh->rollBack();
		throw $e;
	}
	
	/*
	 * Вычисление значения счета
	*/
	// Total by account
	$query = "SELECT
	  ROUND(SUM(quantity_num / quantity_denom), 2) AS total_by_current
	FROM splits
	WHERE account_guid = '$current_account'";
	
	$result = $dbh->query ( $query ) or die ( 'Query failed: ' . mysql_error () );
	$total_by_current = $result->fetchColumn ();
	echo $total_by_current ;
	
	
} else {
	throw new Exception ( 'Не переданы аргументы.' );
}

