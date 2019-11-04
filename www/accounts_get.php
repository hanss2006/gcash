<?php
include "headers.inc.php";
$output = [];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
  if (!($conn->connect_errno)) {
    if (isset($_GET["guid"])) {
      $guid = $conn->real_escape_string($_GET["guid"]);
      $sql = "select * from accounts where guid = '" . $guid . "'";
      $q = $conn->query($sql);
      if ($row = $q->fetch_assoc()) {
        $output = [
          "guid" => $row["guid"]
          , "name" => $row["name"]
          , "account_type" => $row["account_type"]
          , "commodity_guid" => $row["commodity_guid"]
          , "commodity_scu" => $row["commodity_scu"]
          , "non_std_scu" => $row["non_std_scu"]
          , "parent_guid" => $row["parent_guid"]
          , "code" => $row["code"]
          , "description" => $row["description"]
          , "hidden" => $row["hidden"]
          , "placeholder" => $row["placeholder"]
        ];
      }
    } else {
      $q = $conn->query(
        "SELECT guid, name, account_type, commodity_guid, commodity_scu, non_std_scu,
               parent_guid, code, description, hidden, placeholder
              FROM accounts
              WHERE account_type IN ('EXPENSE', 'ASSET', 'BANK', 'INCOME', 'CASH', 'CREDIT') AND !placeholder AND commodity_scu = 100
              ORDER BY name"
      );
      while ($row = $q->fetch_assoc()) {
        $output[] = [
          "guid" => $row["guid"]
          , "name" => $row["name"]
          , "account_type" => $row["account_type"]
          , "commodity_guid" => $row["commodity_guid"]
          , "commodity_scu" => $row["commodity_scu"]
          , "non_std_scu" => $row["non_std_scu"]
          , "parent_guid" => $row["parent_guid"]
          , "code" => $row["code"]
          , "description" => $row["description"]
          , "hidden" => $row["hidden"]
          , "placeholder" => $row["placeholder"]
        ];
      }
    }
    $q->close();
    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
