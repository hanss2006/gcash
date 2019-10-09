SELECT
  transactions.guid, DATE_FORMAT(transactions.post_date, '%d.%m.%Y') AS post_date, 
  transactions.description,
  t1.value_num AS value_num,
  t2.acc_cred, t2.value_num AS cred_value_num
FROM (SELECT
    tx_guid,
    memo AS memo,
    value_num / value_denom AS value_num
  FROM splits
  WHERE splits.account_guid = '4cb873379b39e82a3d16e0f4082dd916'
  ) t1
  INNER JOIN (SELECT
      splits.tx_guid, account_guid AS acc_cred,
      splits.value_num / splits.value_denom AS value_num
    FROM splits
    WHERE splits.account_guid <> '4cb873379b39e82a3d16e0f4082dd916'
  ) t2
    ON t1.tx_guid = t2.tx_guid
  INNER JOIN transactions
    ON transactions.guid = t1.tx_guid;