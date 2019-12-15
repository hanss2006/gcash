<?php
include "headers.inc.php";
include "transform_tree.php";

$output = [];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
  if (!($conn->connect_errno)) {

//    $root_id = "124b2ad3633e2b6c8ff26505730c09a7";
//    $sql = "select * from accounts where guid = '" . $guid . "'";
//    $q = $conn->query($sql);
//    if ($row = $q->fetch_assoc()) {
//      $output = [
//        "guid" => $row["guid"]
//        , "name" => $row["name"]
//        , "account_type" => $row["account_type"]
//        , "commodity_guid" => $row["commodity_guid"]
//        , "commodity_scu" => $row["commodity_scu"]
//        , "non_std_scu" => $row["non_std_scu"]
//        , "parent_guid" => $row["parent_guid"]
//        , "code" => $row["code"]
//        , "description" => $row["description"]
//        , "hidden" => $row["hidden"]
//        , "placeholder" => $row["placeholder"]
//      ];
//    }


    // Get the result from DB Table
    $records = $conn->query(
      "SELECT
                guid,
                name,
                account_type,
                commodity_guid,
                commodity_scu,
                non_std_scu,
                parent_guid,
                code,
                description,
                hidden,
                placeholder
             FROM accounts ORDER BY parent_guid"
    );
    // Fetch all records
    // @MYSQLI_ASSOC - Columns are returned into the array having the field name as the array index.
    $treeArray = mysqli_fetch_all($records, MYSQLI_ASSOC);


    // Group by parent id
    $treeArrayGroups = [];
    foreach ($treeArray as $record) {
      $treeArrayGroups[$record['parent_guid']][] = $record;
    }
// Get the root
    $rootArray = $treeArray[0];
// Transform the data
    $output = transformTree($treeArrayGroups, $rootArray);



    $records->close();
    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
