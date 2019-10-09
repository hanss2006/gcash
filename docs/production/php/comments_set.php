<?php
include "headers.inc.php";
$output = ["status" => 0];
$conn = new mysqli("localhost", "plants", "plants", "plants");
if (!($conn->connect_errno)) {
  $_POST = json_decode(file_get_contents("php://input"), true);
  $id = $conn->real_escape_string($_POST["id"]);
  if (isset($_POST["mode"]) && ($_POST["mode"] == "delete")) {
    session_start();
    if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
      $q = $conn->query("delete from comments where id = " . $id);
    } else {
      session_destroy();
    }
  } else {
    $username = $conn->real_escape_string($_POST["username"]);
    $content = $conn->real_escape_string($_POST["content"]);
    if ($id == 0) {
      $plant = $conn->real_escape_string($_POST["plant"]);
      $q = $conn->query("insert into comments(username, content, plant) values('" .
      $username . "', '" . $content . "', " . $plant . ")");
      $lid = $conn->insert_id;
      $q = $conn->query("select username, content, added from comments where id = " . $lid);
      $row = $q->fetch_assoc();
      $output["data"] = ["username" => $row["username"], "content" => $row["content"],
      "added" => $row["added"]];
    } else {
      session_start();
      if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
        $hidden = $_POST["hidden"] ? '1' : '0';
        $q = $conn->query("update comments set username = '" . $username . "', content = '" .
        $content . "', hidden = " . $hidden . " where id = " . $id);
      } else {
        session_destroy();
      }
    }
  }
  $output["status"] = ($q) ? 1 : 0;
  $conn->close();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
