<?php
include "headers.inc.php";
$output = ["status" => 0];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
  $conn = new mysqli("localhost", "plants", "plants", "plants");
  if (!($conn->connect_errno)) {
    $_POST = json_decode(file_get_contents("php://input"), true);
    $id = $conn->real_escape_string($_POST["id"]);
    if (isset($_POST["mode"]) && ($_POST["mode"] == "delete")) {
      $q = $conn->query("delete from cats where id = " . $id);
    } else {
      $name = $conn->real_escape_string($_POST["name"]);
      $ordr = $conn->real_escape_string($_POST["ordr"]);
      if ($id == 0) {
        $q = $conn->query("insert into cats(name, ordr) values('" . $name .
        "', " . $ordr . ")");
      } else {
        $q = $conn->query("update cats set name = '" . $name . "', ordr = " .
        $ordr . " where id = " . $id);
      }
    }
    $output["status"] = ($q) ? 1 : 0;
    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
