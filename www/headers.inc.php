<?php
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

$host     = '192.168.5.45';
$dbname   = 'gnucash1';
$username = 'cash1';
$password = 'cash123';

$conn = new mysqli($host, $username, $password, $dbname);
mysqli_set_charset($conn, 'utf8');

