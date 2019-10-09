SELECT
  COUNT(*) AS num
FROM (SELECT
    tx_guid
  FROM splits
  WHERE account_guid = '4cb873379b39e82a3d16e0f4082dd916'
  GROUP BY tx_guid) t1
  INNER JOIN transactions
    ON transactions.guid = t1.tx_guid
;
