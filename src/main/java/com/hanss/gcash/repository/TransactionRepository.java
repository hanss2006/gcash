package com.hanss.gcash.repository;

import com.hanss.gcash.model.Transaction;
import com.hanss.gcash.model.TransactionShortDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    @Query(
            value = "SELECT " +
                    "transactions.guid AS guid, " +
                    "transactions.description, " +
                    "DATE_FORMAT(transactions.post_date, '%Y-%m-%d') AS 'postDate', " +
                    "ROUND(t1.quantity_num / t1.quantity_denom, 2) AS value, " +
                    "t2.cred_acc AS accountGuid, " +
                    "t1.account_guid AS currentAccountGuid " +
                    "FROM " +
                    "transactions " +
                    "INNER JOIN ( " +
                    "SELECT " +
                    "splits.tx_guid, " +
                    "MAX(splits.account_guid) AS cred_acc, " +
                    "SUM(splits.value_num / splits.quantity_denom) AS cred_value " +
                    "FROM " +
                    "splits " +
                    "WHERE " +
                    "splits.account_guid <> ?1 " +
                    "GROUP BY " +
                    "splits.tx_guid) t2 ON " +
                    "transactions.guid = t2.tx_guid " +
                    "INNER JOIN splits t1 ON " +
                    "transactions.guid = t1.tx_guid " +
                    "WHERE " +
                    "t1.account_guid = ?1 " +
                    "ORDER BY " +
                    "transactions.post_date DESC, " +
                    "enter_date DESC",
            countQuery = "select " +
                    "count(*) " +
                    "FROM " +
                    "transactions " +
                    "INNER JOIN ( " +
                    "SELECT " +
                    "splits.tx_guid " +
                    "FROM splits " +
                    "WHERE " +
                    "splits.account_guid <> ?1 " +
                    "GROUP BY " +
                    "splits.tx_guid) t2 " +
                    "ON " +
                    "transactions.guid = t2.tx_guid " +
                    "INNER JOIN " +
                    "splits t1 " +
                    "ON " +
                    "transactions.guid = t1.tx_guid " +
                    "WHERE " +
                    "t1.account_guid =  ?1",
            nativeQuery = true)
    public Page<TransactionShortDto> findByAccountGuidNative(String accountGuid, Pageable pageable);
}