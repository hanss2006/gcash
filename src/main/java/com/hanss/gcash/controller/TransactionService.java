package com.hanss.gcash.controller;

import com.hanss.gcash.common.Constants;
import com.hanss.gcash.model.Split;
import com.hanss.gcash.model.Transaction;
import com.hanss.gcash.model.TransactionFullDto;
import com.hanss.gcash.repository.SplitRepository;
import com.hanss.gcash.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hanss.gcash.common.UuidUtils;

import javax.transaction.Transactional;
import java.util.Optional;

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
    public TransactionFullDto addTransaction(TransactionFullDto transactionFullDto) throws Exception {
        Transaction transaction = new Transaction();
        transaction.setGuid(UuidUtils.newGuid());
        transaction.setCurrencyGuid(Constants.RUB);
        transaction.setPostDate(transactionFullDto.getPostDate());
        transaction.setEnterDate(transactionFullDto.getPostDate());
        transaction.setDescription(transactionFullDto.getDescription());
        transaction = transactionRepository.save(transaction);

        Split split = new Split();
        split.setGuid(UuidUtils.newGuid());
        split.setTxGuid(transaction.getGuid());
        split.setAccountGuid(transactionFullDto.getCurrentAccountGuid());
        split.setMemo(Constants.SPLIT_MEMO_WEBAPP);
        split.setAction("");
        split.setReconcileState(Constants.SPLIT_RECONCILE_STATE_N);
        split.setValueNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        split.setValueDenom(Constants.SPLIT_DENOM_100);
        split.setQuantityNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        split.setQuantityDenom(Constants.SPLIT_DENOM_100);
        split = splitRepository.save(split);

        Split splitCont = new Split();
        splitCont.setGuid(UuidUtils.newGuid());
        splitCont.setTxGuid(transaction.getGuid());
        splitCont.setAccountGuid(transactionFullDto.getAccountGuid());
        splitCont.setMemo(Constants.SPLIT_MEMO_WEBAPP);
        splitCont.setAction("");
        splitCont.setReconcileState(Constants.SPLIT_RECONCILE_STATE_N);
        splitCont.setValueNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        splitCont.setValueDenom(Constants.SPLIT_DENOM_100);
        splitCont.setQuantityNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        splitCont.setQuantityDenom(Constants.SPLIT_DENOM_100);
        splitCont = splitRepository.save(splitCont);
        transactionFullDto.setTransactionGuid(transaction.getGuid());
        return transactionFullDto;
    }

    /*
     *  Изменение
     * */
    @Transactional
    public TransactionFullDto updateTransaction(TransactionFullDto transactionFullDto) throws Exception {
        Optional <Transaction> optionalTransaction = transactionRepository.findById(transactionFullDto.getTransactionGuid());
        if (!optionalTransaction.isPresent()){
            return null;
        }
        return transactionFullDto;
    }
}