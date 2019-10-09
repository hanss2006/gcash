<?php
require_once "connect.php";

// current_account = текущий номер счета
// account = корреспондирующий счет
// guid = индентификатор транзакции
// today = дата проводки
// description = комментарии
// value = сумма проводки

if (isset ( $_REQUEST ["current_account"] ) & isset ( $_REQUEST ["account"] ) & isset ( $_REQUEST ["guid"] ) & isset ( $_REQUEST ["description"] ) & isset ( $_REQUEST ["value"] )) {
	$current_account = $_REQUEST ["current_account"];
	$account = $_REQUEST ["account"];
	$guid = $_REQUEST ["guid"];
	$description = $_REQUEST ["description"];
	$value = $_REQUEST ["value"];
	$denom = 100;

	$sql = "UPDATE transactions 
			SET
 				description = '$description' -- description - VARCHAR(2048)
			WHERE
	  			guid = '$guid' -- guid - VARCHAR(32) NOT NULL";
	try {
		/* Начало транзакции, отключение автоматической фиксации */
		$dbh->beginTransaction();
		$count = $dbh->exec($sql);

		$value_ins = $value*$denom;
		$sql = "UPDATE splits 
			SET
				value_num = $value_ins -- value_num - BIGINT(20) NOT NULL
 				,quantity_num = $value_ins -- quantity_num - BIGINT(20) NOT NULL
			WHERE
  				tx_guid = '$guid' AND account_guid = '$current_account'  -- guid - VARCHAR(32) NOT NULL";
		$count = $dbh->exec($sql);

		$value_ins = -$value*$denom;
		$sql = "UPDATE splits
			SET
				account_guid = '$account'
				,value_num = $value_ins -- value_num - BIGINT(20) NOT NULL
				,quantity_num = $value_ins -- quantity_num - BIGINT(20) NOT NULL
			WHERE
				tx_guid = '$guid' AND account_guid <> '$current_account'  -- guid - VARCHAR(32) NOT NULL";
		$count = $dbh->exec($sql);
	
	
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
