<?php
include "headers.inc.php";
$output = ["status" => 0];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != "") {
  $conn = new mysqli("localhost", "plants", "plants", "plants");
  if (!($conn->connect_errno)) {
    $path = realpath(dirname(__FILE__) . "\\..\\uploads\\main") . "\\";
    $path2 = realpath(dirname(__FILE__) . "\\..\\uploads\\additional") . "\\";
    $id = $conn->real_escape_string($_POST["id"]);
    if (isset($_POST["mode"])) {
      $mode = $_POST["mode"];
      switch ($mode) {
        case "addpics":
          if (isset($_FILES["additionalpics"])) {
            for ($i = 0; $i < count($_FILES["additionalpics"]["name"]); $i++) {
              if ($_FILES["additionalpics"]["error"][$i] == 0) {
                $ext = end(explode(".", $_FILES["additionalpics"]["name"][$i]));
                $q = $conn->query("insert into pics(plant, picext) values(" . $id . ", '" . $ext . "')");
                $rid = $conn->insert_id;
                move_uploaded_file($_FILES["additionalpics"]["tmp_name"][$i], $path2 . $rid . "." . $ext);
                $output["data"][] = ["path" => "/uploads/additional/" . $rid . "." . $ext, "id" => $rid];
              }
            }
          }
          break;
        case "deletepic":
          $q = $conn->query("select picext from pics where id = " . $id);
          $row = $q->fetch_assoc();
          $file = $path2 . $id . "." . $row["picext"];
          if (file_exists($file)) {
            unlink($file);
          }
          $q->close();
          $q = $conn->query("delete from pics where id = " . $id);
          break;
        case "delete":
          $q = $conn->query("select id, picext from pics where plant = " . $id);
          while ($row = $q->fetch_assoc()) {
            $file = $path2 . $row["id"] . "." . $row["picext"];
            if (file_exists($file)) {
              unlink($file);
            }
          }
          $q->close();
          $q = $conn->query("select picext from plants where id = " . $id);
          $ext = $q->fetch_assoc()["picext"];
          $file = $path . $id . "." . $ext;
          if (file_exists($file)) {
            unlink($file);
          }
          $q->close();
          $q = $conn->query("delete from plants where id = " . $id);
          break;
      }
    } else {
      $name = $conn->real_escape_string($_POST["name"]);
      $short = $conn->real_escape_string($_POST["short"]);
      $lng = $conn->real_escape_string($_POST["lng"]);
      $price = $conn->real_escape_string($_POST["price"]);
      $featured = $conn->real_escape_string($_POST["featured"]);
      $cat = $conn->real_escape_string($_POST["cat"]);
      if ((isset($_FILES["mainpic"])) && ($_FILES["mainpic"]["error"] == 0)) {
        $ext = end(explode(".", $_FILES["mainpic"]["name"]));
      } else {
        $ext = "";
      }
      if ($id == 0) {
        $q = $conn->query("insert into plants(name, short, lng, price, featured, cat, picext) values('" .
        $name . "', '" . $short . "', '" . $lng . "', " . $price . ", " . $featured . ", " . $cat .
        ", '" . $ext . "')");
        $lid = $conn->insert_id;
        if ((isset($_FILES["mainpic"])) && ($_FILES["mainpic"]["error"] == 0)) {
          $file = $path . $lid . "." . $ext;
          move_uploaded_file($_FILES["mainpic"]["tmp_name"], $file);
        }
        if (isset($_FILES["additionalpics"])) {
          for ($i = 0; $i < count($_FILES["additionalpics"]["name"]); $i++) {
            if ($_FILES["additionalpics"]["error"][$i] == 0) {
              $ext = end(explode(".", $_FILES["additionalpics"]["name"][$i]));
              $q = $conn->query("insert into pics(plant, picext) values(" . $lid . ", '" . $ext . "')");
              $rid = $conn->insert_id;
              $file = $path2 . $rid . "." . $ext;
              move_uploaded_file($_FILES["additionalpics"]["tmp_name"][$i], $file);
            }
          }
        }
      } else {
        if ((isset($_FILES["mainpic"])) && ($_FILES["mainpic"]["error"] == 0)) {
          $q = $conn->query("select picext from plants where id = " . $id);
          $row = $q->fetch_assoc();
          $file = $path . $id . "." . $row["picext"];
          if (file_exists($file)) {
            unlink($file);
          }
          $q->close();
          $s = ", picext = '" . $ext . "'";
        } else {
          $s = "";
        }
        $q = $conn->query("update plants set name = '" . $name . "', short = '" . $short .
        "', lng = '" . $lng . "', price = " . $price . ", featured = " . $featured .
        ", cat = " . $cat . $s . " where id = " . $id);
        if ((isset($_FILES["mainpic"])) && ($_FILES["mainpic"]["error"] == 0)) {
          $file = $path . $id . "." . $ext;
          move_uploaded_file($_FILES["mainpic"]["tmp_name"], $file);
        }
      }
    }
    $output["status"] = ($q) ? 1 : 0;
    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
