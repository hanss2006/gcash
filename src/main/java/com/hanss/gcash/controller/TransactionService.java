package com.hanss.gcash.controller;

import com.hanss.gcash.model.TransactionFullDto;
import com.hanss.gcash.repository.SplitRepository;
import com.hanss.gcash.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private SplitRepository splitRepository;

    /*
     *  Удаление
     * */
    @Transactional
    public void deleteTransaction(String transactionGuid) throws Exception {
        splitRepository.deleteByTxGuid(transactionGuid);
        transactionRepository.deleteById(transactionGuid);
    }

    /*
    *  Добавление
    * */
    @Transactional
    public void addTransaction(TransactionFullDto transactionFullDto) throws Exception {
        //Transaction transaction = new Transaction()
        //repository.save(new Customer("Jack", "Bauer"));
/*
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
*/
    }

    /*
     *  Изменение
     * */
    @Transactional
    public void updateTransaction(TransactionFullDto transactionFullDto) throws Exception {
       /*
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
        */
    }
}