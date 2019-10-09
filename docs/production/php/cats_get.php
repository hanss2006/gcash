<?php
include "headers.inc.php";
$output = [];
$conn = new mysqli("localhost", "plants", "plants", "plants");
if (!($conn->connect_errno)) {
  if (isset($_GET["id"])) {
    $id = $conn->real_escape_string($_GET["id"]);
    $q = $conn->query("select * from cats where id = " . $id);
    if ($row = $q->fetch_assoc()) {
      $output = ["id" => $row["id"], "name" => $row["name"], "ordr" => $row["ordr"]];
    }
  } else {
    $q = $conn->query("select * from cats order by ordr desc, name");
    while ($row = $q->fetch_assoc()) {
      $output[] = ["id" => $row["id"], "name" => $row["name"], "ordr" => $row["ordr"]];
    }
  }
  $q->close();
  $conn->close();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
