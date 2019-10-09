<?php
require_once "connect.php";
 
 
if (isset($_GET['term'])){
	$return_arr = array();
 
	try {
	    $stmt = $dbh->prepare('SELECT DISTINCT description FROM gnucash.transactions WHERE description LIKE :term');
	    $stmt->execute(array('term' => '%'.$_GET['term'].'%'));
	    
	    while($row = $stmt->fetch()) {
	        $return_arr[] =  $row['description'];
	    }
 
	} catch(PDOException $e) {
	    echo 'ERROR: ' . $e->getMessage();
	}
 
 
    /* Toss back results as json encoded array. */
    echo json_encode($return_arr);
}
