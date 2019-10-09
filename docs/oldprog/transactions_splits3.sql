SELECT
  transactions.guid AS guid,
  transactions.description,
  DATE_FORMAT(transactions.post_date, '%d.%m.%Y') AS post_date,
  t1.value_num / t1.value_denom AS value_num,
  t2.cred_acc,
  t2.cred_value
FROM transactions
  INNER JOIN (SELECT
      splits.tx_guid,
      MAX(splits.account_guid) AS cred_acc,
      SUM(splits.value_num / splits.quantity_denom) AS cred_value
    FROM splits
    WHERE splits.account_guid <> '4cb873379b39e82a3d16e0f4082dd916'
    GROUP BY splits.tx_guid) t2
    ON transactions.guid = t2.tx_guid
  INNER JOIN splits t1
    ON transactions.guid = t1.tx_guid
WHERE t1.account_guid = '4cb873379b39e82a3d16e0f4082dd916'
ORDER BY transactions.post_date DESC