<?php
include "headers.inc.php";
$output = [];
$conn = new mysqli("localhost", "plants", "plants", "plants");
if (!($conn->connect_errno)) {
  $path = realpath(dirname(__FILE__) . "\\..\\uploads\\main") . "\\";
  if (isset($_GET["id"])) {
    $id = $conn->real_escape_string($_GET["id"]);
    $q = $conn->query("select * from plants where id = " . $id);
    if ($row = $q->fetch_assoc()) {
      $output = ["id" => $row["id"], "name" => $row["name"], "short" => $row["short"],
      "lng" => $row["lng"], "price" => $row["price"], "featured" => ($row["featured"] == 1),
      "cat" => $row["cat"]];
      if (file_exists($path . $row["id"] . "." . $row["picext"])) {
        $output["mainPic"] = "/uploads/main/" . $row["id"] . "." . $row["picext"];
      }
      $path2 = realpath(dirname(__FILE__) . "\\..\\uploads\\additional") . "\\";
      $q2 = $conn->query("select id, picext from pics where plant = " . $row["id"]);
      while ($row2 = $q2->fetch_assoc()) {
        if (file_exists($path2 . $row2["id"] . "." . $row2["picext"])) {
          $output["additionalPics"][] = ["path" => "/uploads/additional/" . $row2["id"] .
          "." . $row2["picext"], "id" => $row2["id"]];
        }
      }
      $q2->close();
    }
    $q->close();
  } else {
    if (isset($_GET["cat"])) {
      $cat = $conn->real_escape_string($_GET["cat"]);
      $page_num = $conn->real_escape_string($_GET["page"]);
      $page_count = $conn->real_escape_string($_GET["count"]);
      if (isset($_GET["search"])) {
        $search = $conn->real_escape_string($_GET["search"]);
        $s = " and (name like '%" . $search . "%' or short like '%" . $search .
        "%' or lng like '%" . $search . "%')";
      } else {
        $s = "";
      }
      $q = $conn->query("select count(*) as cnt from plants where cat = " . $cat . $s);
      $rec_count = $q->fetch_assoc()["cnt"];
      $q->close();
      $offset = ($page_num - 1) * $page_count;
      $output["data"] = [];
      $output["pages"] = ceil($rec_count / $page_count);
      if ($offset < $rec_count) {
        $q = $conn->query("select * from plants where cat = " . $cat . $s .
        " order by name limit " . $page_count . " offset " . $offset);
        while ($row = $q->fetch_assoc()) {
          $arr = ["id" => $row["id"], "name" => $row["name"], "short" => $row["short"],
          "lng" => $row["lng"], "price" => $row["price"], "featured" => ($row["featured"] == 1),
          "cat" => $row["cat"]];
          if (file_exists($path . $row["id"] . "." . $row["picext"])) {
            $arr["mainPic"] = "/uploads/main/" . $row["id"] . "." . $row["picext"];
          }
          $output["data"][] = $arr;
        }
        $q->close();
      }
    } else {
      $q = $conn->query("select * from plants where featured order by name");
      while ($row = $q->fetch_assoc()) {
        $arr = ["id" => $row["id"], "name" => $row["name"], "short" => $row["short"],
        "lng" => $row["lng"], "price" => $row["price"], "featured" => ($row["featured"] == 1),
        "cat" => $row["cat"]];
        if (file_exists($path . $row["id"] . "." . $row["picext"])) {
          $arr["mainPic"] = "/uploads/main/" . $row["id"] . "." . $row["picext"];
        }
        $output[] = $arr;
      }
      $q->close();
    }
  }
  $conn->close();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
