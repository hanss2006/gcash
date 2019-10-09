<?php
include "headers.inc.php";
$output = [];
$conn = new mysqli("localhost", "plants", "plants", "plants");
if (!($conn->connect_errno)) {
  if (isset($_GET["id"])) {
    $id = $conn->real_escape_string($_GET["id"]);
    $q = $conn->query("select comments.*, plants.name as plantname, cats.name as catname " .
    "from comments inner join (plants inner join cats on plants.cat = cats.id) on " .
    "comments.plant = plants.id where comments.id = " . $id);
    if ($row = $q->fetch_assoc()) {
      $output = ["id" => $row["id"], "username" => $row["username"], "content" => $row["content"],
      "added" => $row["added"], "hidden" => ($row["hidden"] == 1), "plantName" => $row["plantname"],
      "catName" => $row["catname"]];
    }
    $q->close();
  } else {
    if (isset($_GET["plant"])) {
      $plant = $conn->real_escape_string($_GET["plant"]);
      $q = $conn->query("select username, content, added from comments where not hidden " .
      "and plant = " . $plant . " order by added");
      while ($row = $q->fetch_assoc()) {
        $output[] = ["username" => $row["username"], "content" => $row["content"],
        "added" => $row["added"]];
      }
      $q->close();
    } else {
      $page_num = $conn->real_escape_string($_GET["page"]);
      $page_count = $conn->real_escape_string($_GET["count"]);
      if (isset($_GET["search"])) {
        $search = $conn->real_escape_string($_GET["search"]);
        $s = " where (username like '%" . $search . "%' or content like '%" . $search . "%')";
      } else {
        $s = "";
      }
      $q = $conn->query("select count(*) as cnt from comments" . $s);
      $rec_count = $q->fetch_assoc()["cnt"];
      $q->close();
      $offset = ($page_num - 1) * $page_count;
      $output["data"] = [];
      $output["pages"] = ceil($rec_count / $page_count);
      if ($offset < $rec_count) {
        $q = $conn->query("select comments.*, plants.name as plantname, cats.name as catname " .
        "from comments inner join (plants inner join cats on plants.cat = cats.id) on " .
        "comments.plant = plants.id " . $s . " order by added desc limit " . $page_count .
        " offset " . $offset);
        while ($row = $q->fetch_assoc()) {
          $output["data"][] = ["id" => $row["id"], "username" => $row["username"],
          "content" => $row["content"], "added" => $row["added"], "hidden" => ($row["hidden"] == 1),
          "plantName" => $row["plantname"], "catName" => $row["catname"]];
        }
        $q->close();
      }
    }
  }
  $conn->close();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
