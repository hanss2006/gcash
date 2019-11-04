<?php
include "headers.inc.php";
$output = ["role" => ""];
switch($_GET["action"]) {
  case "login":
    if (!($conn->connect_errno)) {
      $_POST = json_decode(file_get_contents("php://input"), true);
      $name = $conn->real_escape_string($_POST["name"]);
      $password = $conn->real_escape_string($_POST["password"]);
      $q = $conn->query("select role from users where name = '" . $name .
      "' and password = '" . $password . "'");
      if ($row = $q->fetch_assoc()) {
        session_start();
        $_SESSION["role"] = $row["role"];
        $output["role"] = $row["role"];
      }
    }
    break;
  case "logout":
    session_start();
    if ((isset($_SESSION["role"])) && ($_SESSION["role"] != "")) {
      session_destroy();
      $output["role"] = "";
    }
    break;
  case "check":
    session_start();
    if ((isset($_SESSION["role"])) && ($_SESSION["role"] != "")) {
      $output["role"] = $_SESSION["role"];
    } else {
      session_destroy();
    }
    break;
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
