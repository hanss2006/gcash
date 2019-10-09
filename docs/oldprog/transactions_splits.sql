SELECT
  transactions.guid, DATE_FORMAT(transactions.post_date, '%d.%m.%Y') AS post_date, 
  transactions.description,
  t1.acc_deb, t1.value_num AS deb_value_num,
  t2.acc_cred, t2.value_num AS cred_value_num
FROM (SELECT
    splits.tx_guid, MAX(account_guid) AS acc_deb,
    SUM(splits.value_num / splits.value_denom) AS value_num
  FROM splits
  WHERE splits.value_num > 0
  GROUP BY splits.tx_guid) t1
  INNER JOIN (SELECT
      splits.tx_guid, MAX(account_guid) AS acc_cred,
      SUM(splits.value_num / splits.value_denom) AS value_num
    FROM splits
    WHERE splits.value_num < 0
    GROUP BY splits.tx_guid) t2
    ON t1.tx_guid = t2.tx_guid
  INNER JOIN transactions
    ON transactions.guid = t1.tx_guid;