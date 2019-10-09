<?php

$dsn = 'mysql:host=localhost;dbname=gnucash';
$username = 'cash';
$password = 'cash123';
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
); 

$dbh = new PDO($dsn, $username, $password, $options);

?>
