<?php
require_once "connect.php";

// value = введенное значение
// id = номер строки
// field = название столбца
// table = собственно название таблицы
if (isset($_REQUEST ["value"])&isset($_REQUEST ["id"])&isset($_REQUEST ["field"])&isset($_REQUEST ["table"]))
{
	$value	= $_REQUEST ["value"];
	$id		= $_REQUEST ["id"];
	$field	= $_REQUEST ["field"];
	$table	= $_REQUEST ["table"];
	
	$sql = "UPDATE $table SET $field='$value' WHERE guid='$id'";
	
	$count = $dbh->exec($sql);
}else throw new Exception('Не переданы аргументы.');
