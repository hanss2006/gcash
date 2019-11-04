<?php
include "headers.inc.php";
$output = ["status" => 0];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) == "a"){
    if (!($conn->connect_errno)){
        $_POST = json_decode(file_get_contents("php://input"), true);
        $id = $conn->real_escape_string($_POST["id"]);
        if (isset($_POST["mode"]) && ($_POST["mode"]=="delete")){
            $q = $conn->query("delete from users where id = " . $id);
        } else {
            $name = $conn->real_escape_string($_POST["name"]);
            $password = $conn->real_escape_string($_POST["password"]);
            $role = $conn->real_escape_string($_POST["role"]);
            if ($id==0){
                $q = $conn->query("insert into users (name, password, role) " .
                    "values('" . $name . "', '" . $password . "', '" . $role . "')");
            } else {
                $q = $conn->query("update users set name = '" . $name .
                    "', password = '" . $password . "', role = '" . $role .
                    "' where id = " . $id);
            }
        }
        $output["status"] = ($q) ? 1 : 0;
        $conn->close();
    }
} else {
    session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
