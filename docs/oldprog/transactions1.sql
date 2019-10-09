SELECT
  transactions.guid AS guid,
  transactions.description AS description,
  transactions.enter_date AS enter_date,
  t1.value_num AS value_num,
  t1.memo AS memo
FROM (SELECT
    tx_guid,
    MAX(memo) AS memo,
    SUM(value_num / value_denom) AS value_num
  FROM splits
  WHERE account_guid = '4cb873379b39e82a3d16e0f4082dd916'
  GROUP BY tx_guid) t1
  INNER JOIN transactions
    ON transactions.guid = t1.tx_guid
ORDER BY enter_date DESC;