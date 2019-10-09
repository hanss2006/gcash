<?php
require_once "connect.php";

if (isset ( $_REQUEST ["current_account"] ) & isset ( $_REQUEST ["guid"] )) {
	$current_account = $_REQUEST ["current_account"];
	$guid = $_REQUEST ["guid"];
	
	$sql = "DELETE FROM splits
			WHERE tx_guid = '$guid'";
	try {
		/* Начало транзакции, отключение автоматической фиксации */
		$dbh->beginTransaction();
		$count = $dbh->exec ( $sql );
	
		$sql = "DELETE FROM transactions
			WHERE guid = '$guid'";
		$count = $dbh->exec($sql);
	
		/* Фиксация изменений */
		$dbh->commit ();
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
	