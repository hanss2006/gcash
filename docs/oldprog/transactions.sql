SELECT
  transactions.guid,
  transactions.enter_date,
  transactions.description,
  splits.value_num,
  splits.value_denom,
  splits.account_guid
FROM splits
  INNER JOIN transactions
    ON splits.tx_guid = transactions.guid
GROUP BY transactions.guid,
         transactions.enter_date,
         transactions.description
ORDER BY transactions.enter_date DESC