<?php
include "headers.inc.php";
include "guid_funcs.php";
// current_account = текущий номер счета
// account = корреспондирующий счет
// guid = индентификатор транзакции
// post_date = дата проводки
// description = комментарии
// value = сумма проводки

$output = ["status" => 0];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != ""){
  if (!($conn->connect_errno)){
    $_POST = json_decode(file_get_contents("php://input"), true);
    $current_account = "";
    $account = "";
    $post_date = "";
    $description = "";
    $value = 0.0;
    $guid = "";
    $q = false;
    $sql = "";
    //print_r ($_POST);
    if (isset($_POST["currentAccount"])) $current_account = $conn->real_escape_string($_POST["currentAccount"]);
    if (isset($_POST["account"])) $account = $conn->real_escape_string($_POST["account"]);
    if (isset($_POST["date"])) $post_date = $conn->real_escape_string($_POST["date"]);
    if (isset($_POST["description"])) $description = $conn->real_escape_string($_POST["description"]);
    if (isset($_POST["value"])) $value = (float)$conn->real_escape_string($_POST["value"]);
    if (isset($_POST["guid"])) $guid = $conn->real_escape_string($_POST["guid"]);

    $denom = 100;
    $conn->autocommit(FALSE);
    // Удаление
    if (isset($_POST["mode"]) && ($_POST["mode"]=="delete")){
        /* Начало транзакции, отключение автоматической фиксации */
        $conn->begin_transaction();
        $conn->query("DELETE FROM splits WHERE tx_guid = '" . $guid . "'");
        $conn->query("DELETE FROM transactions WHERE guid = '" . $guid . "'");
        $q = $conn->commit();
    } else {
      // Добавление
      if (isset($_POST["guid"]) && ($_POST["guid"]=="")){
        $guid = new_guid();
        $conn->begin_transaction();
        $sql = "INSERT INTO transactions (
                                    guid,currency_guid, num, post_date, enter_date, description
                                ) VALUES (
                                    '$guid' -- guid - VARCHAR(32) NOT NULL
                                    ,'eecd73e9d75ee21ffcc4a773eb9831a8' -- currency_guid - VARCHAR(32) NOT NULL
                                    ,'' -- num - VARCHAR(2048) NOT NULL
                                    ,'$post_date' -- post_date - TIMESTAMP
                                    , UTC_TIMESTAMP() -- enter_date - TIMESTAMP
                                    ,'$description' -- description - VARCHAR(2048)
                                )";
        //echo $sql;
        $conn->query($sql);

        $value_ins = $value*$denom;
        $guid_split = new_guid();
        $sql = "INSERT INTO splits (
                                    guid
                                    ,tx_guid
                                    ,account_guid
                                    ,memo
                                    ,action
                                    ,reconcile_state
                                    ,reconcile_date
                                    ,value_num
                                    ,value_denom
                                    ,quantity_num
                                    ,quantity_denom 
                                    )
                                VALUES (
                                    '$guid_split' -- guid - VARCHAR(32) NOT NULL
                                    , '$guid' -- tx_guid - VARCHAR(32) NOT NULL
                                    , '$current_account' -- account_guid - VARCHAR(32) NOT NULL
                                    , 'webapp' -- memo - VARCHAR(2048) NOT NULL
                                    , '' -- action - VARCHAR(2048) NOT NULL
                                    , 'n' -- reconcile_state - VARCHAR(1) NOT NULL
                                    , NULL
                                    , $value_ins -- value_num - BIGINT(20) NOT NULL
                                    , $denom -- value_denom - BIGINT(20) NOT NULL
                                    , $value_ins -- quantity_num - BIGINT(20) NOT NULL
                                    , $denom -- quantity_denom - BIGINT(20) NOT NULL
                                    )";
        $conn->query($sql);

        $value_ins = -$value*$denom;
        $guid_split = new_guid();
        $sql = "INSERT INTO splits (
                                    guid
                                    ,tx_guid
                                    ,account_guid
                                    ,memo
                                    ,action
                                    ,reconcile_state
                                    ,reconcile_date
                                    ,value_num
                                    ,value_denom
                                    ,quantity_num
                                    ,quantity_denom )
                                VALUES (
                                    '$guid_split' -- guid - VARCHAR(32) NOT NULL
                                    , '$guid' -- tx_guid - VARCHAR(32) NOT NULL
                                    , '$account' -- account_guid - VARCHAR(32) NOT NULL
                                    , 'webapp' -- memo - VARCHAR(2048) NOT NULL
                                    , '' -- action - VARCHAR(2048) NOT NULL
                                    , 'n' -- reconcile_state - VARCHAR(1) NOT NULL
                                    , NULL
                                    , $value_ins -- value_num - BIGINT(20) NOT NULL
                                    , $denom -- value_denom - BIGINT(20) NOT NULL
                                    , $value_ins -- quantity_num - BIGINT(20) NOT NULL
                                    , $denom -- quantity_denom - BIGINT(20) NOT NULL
                                    )";
        $conn->query($sql);
        $q = $conn->commit();
      } elseif (isset($_POST["guid"]) && ($_POST["guid"]!='')) {
        // Изменение
        $conn->begin_transaction();
        $sql = "UPDATE transactions
                  SET
                    post_date = '$post_date',
                    description = '$description' -- description - VARCHAR(2048)
                  WHERE
                    guid = '$guid' -- guid - VARCHAR(32) NOT NULL";
        $conn->query($sql);

        $value_ins = $value*$denom;
        $sql = "UPDATE splits
                SET
                    value_num = $value_ins -- value_num - BIGINT(20) NOT NULL
                    ,quantity_num = $value_ins -- quantity_num - BIGINT(20) NOT NULL
                WHERE
                    tx_guid = '$guid' AND account_guid = '$current_account'  -- guid - VARCHAR(32) NOT NULL";
        $conn->query($sql);

        $value_ins = -$value*$denom;
        $sql = "UPDATE splits
                SET
                    account_guid = '$account' -- account_guid - VARCHAR(32) NOT NULL
                    ,value_num = $value_ins -- value_num - BIGINT(20) NOT NULL
                    ,quantity_num = $value_ins -- quantity_num - BIGINT(20) NOT NULL
                WHERE
                    tx_guid = '$guid' AND account_guid <> '$current_account'  -- guid - VARCHAR(32) NOT NULL";
        $conn->query($sql);

        $q = $conn->commit();
      }
    }
    $output["status"] = ($q) ? 1 : 0;
    $output["guid"] = $guid;

    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
