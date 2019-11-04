<?php
include "headers.inc.php";
$output = [];
session_start();
if ((isset($_SESSION["role"])) && ($_SESSION["role"]) != ""){
  if (!($conn->connect_errno)) {
    if (isset($_GET["account_guid"])) $account_guid = $conn->real_escape_string($_GET["account_guid"]);
    if (isset($_GET["guid"])) $guid = $conn->real_escape_string($_GET["guid"]);
    if (isset($_GET["account_guid"]) && !isset($_GET["guid"])) {
      $s = "";

      $page_num = $conn->real_escape_string($_GET["page"]);
      $page_count = $conn->real_escape_string($_GET["count"]);
      if (isset($_GET["search"])) {
        $search = $conn->real_escape_string($_GET["search"]);
        $s = " and transactions.description like '%" . $search . "%' ";
      }
      $q = $conn->query(
        "select count(*) as cnt
                from transactions
                INNER JOIN splits t1 ON
	                  transactions.guid = t1.tx_guid
                WHERE
	                  t1.account_guid = '" . $account_guid . "'" . $s
                );
      $rec_count = $q->fetch_assoc()["cnt"];
      $q->close();
      $offset = ($page_num - 1) * $page_count;
      $output["data"] = [];
      $output["pages"] = ceil($rec_count / $page_count);
      if ($offset < $rec_count) {
        $sql = <<<EOD
SELECT
	transactions.guid AS guid,
	transactions.description,
	DATE_FORMAT(transactions.post_date, '%Y-%m-%d') AS 'date',
	ROUND(t1.quantity_num / t1.quantity_denom, 2) AS value,
	t2.cred_acc AS account,
	t1.account_guid AS currentAccount
FROM
	transactions
INNER JOIN (
	SELECT
		splits.tx_guid,
		MAX(splits.account_guid) AS cred_acc,
		SUM(splits.value_num / splits.quantity_denom) AS cred_value
	FROM
		splits
	WHERE
		splits.account_guid <> '$account_guid'
	GROUP BY
		splits.tx_guid) t2 ON
	transactions.guid = t2.tx_guid
INNER JOIN splits t1 ON
	transactions.guid = t1.tx_guid
WHERE
	t1.account_guid = '$account_guid'$s
ORDER BY
	transactions.post_date DESC,
	enter_date DESC
EOD;
        $sql = $sql . " limit " . $page_count . " offset " . $offset;
        $q = $conn->query($sql);

        while ($row = $q->fetch_assoc()) {
          $arr = ["guid" => $row["guid"], "description" => $row["description"],
            "date" => $row["date"], "value" => $row["value"], "account" => $row["account"], "currentAccount"=>$row["currentAccount"]];
          $output["data"][] = $arr;
        }
      }
    } elseif (isset($_GET["account_guid"]) && isset($_GET["guid"])) {
      $sql = <<<EOD
SELECT
	transactions.guid AS guid,
	transactions.description,
	DATE_FORMAT(transactions.post_date, '%Y-%m-%d') AS 'date',
	ROUND(t1.quantity_num / t1.quantity_denom, 2) AS value,
	t2.cred_acc AS account,
	t1.account_guid AS currentAccount
FROM
	transactions
INNER JOIN (
	SELECT
		splits.tx_guid,
		MAX(splits.account_guid) AS cred_acc,
		SUM(splits.value_num / splits.quantity_denom) AS cred_value
	FROM
		splits
	WHERE
		splits.account_guid <> '$account_guid'
		AND
		splits.tx_guid = '$guid'
	GROUP BY
		splits.tx_guid) t2 ON
	transactions.guid = t2.tx_guid
INNER JOIN splits t1 ON
	transactions.guid = t1.tx_guid
WHERE
	t1.account_guid = '$account_guid'
	AND
	transactions.guid='$guid'
EOD;

      $q = $conn->query($sql);
      if ($row = $q->fetch_assoc()){
        $output = ["guid" => $row["guid"], "description" => $row["description"],
          "date" => $row["date"], "value" => $row["value"], "account" => $row["account"], "currentAccount"=>$row["currentAccount"]];
      }
    }
    $q->close();
    $conn->close();
  }
} else {
  session_destroy();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);

