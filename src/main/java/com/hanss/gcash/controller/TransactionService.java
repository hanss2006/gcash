package com.hanss.gcash.controller;

import com.hanss.gcash.common.Constants;
import com.hanss.gcash.common.UuidUtils;
import com.hanss.gcash.model.*;
import com.hanss.gcash.repository.AccountRepository;
import com.hanss.gcash.repository.SplitRepository;
import com.hanss.gcash.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private SplitRepository splitRepository;

    @Autowired
    private AccountRepository accountRepository;
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
        split.setReconcileState(Constants.SPLIT_RECONCILE_STATE_N);
        split.setValueNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        split.setValueDenom(Constants.SPLIT_DENOM_100);
        split.setQuantityNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        split.setQuantityDenom(Constants.SPLIT_DENOM_100);
        splitRepository.save(split);

        Split corSplit = new Split();
        corSplit.setGuid(UuidUtils.newGuid());
        corSplit.setTxGuid(transaction.getGuid());
        corSplit.setAccountGuid(transactionFullDto.getAccountGuid());
        corSplit.setMemo(Constants.SPLIT_MEMO_WEBAPP);
        corSplit.setReconcileState(Constants.SPLIT_RECONCILE_STATE_N);
        corSplit.setValueNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        corSplit.setValueDenom(Constants.SPLIT_DENOM_100);
        corSplit.setQuantityNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
        corSplit.setQuantityDenom(Constants.SPLIT_DENOM_100);
        splitRepository.save(corSplit);
        transactionFullDto.setGuid(transaction.getGuid());
        return transactionFullDto;
    }

    /*
     *  Изменение
     * */
    @Transactional
    public TransactionFullDto updateTransaction(TransactionFullDto transactionFullDto) throws Exception {
        Optional <Transaction> optionalTransaction = transactionRepository.findById(transactionFullDto.getGuid());
        if (!optionalTransaction.isPresent()){
            return null;
        }
        Transaction transaction = optionalTransaction.get();
        transaction.setPostDate(transactionFullDto.getPostDate());
        transaction.setEnterDate(transactionFullDto.getPostDate());
        transaction.setDescription(transactionFullDto.getDescription());
        transaction = transactionRepository.save(transaction);

        for (Split split : transaction.getSplits()) {
            if (split.getAccountGuid().equals(transactionFullDto.getCurrentAccountGuid())){
                split.setValueNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
                split.setValueDenom(Constants.SPLIT_DENOM_100);
                split.setQuantityNum(new Double(transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
                split.setQuantityDenom(Constants.SPLIT_DENOM_100);
                splitRepository.save(split);
            } else {
                split.setAccountGuid(transactionFullDto.getAccountGuid());
                split.setValueNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
                split.setValueDenom(Constants.SPLIT_DENOM_100);
                split.setQuantityNum(new Double(-transactionFullDto.getValue()*Constants.SPLIT_DENOM_100).longValue());
                split.setQuantityDenom(Constants.SPLIT_DENOM_100);
                splitRepository.save(split);
            }
        }
        return transactionFullDto;
    }

    public AccountTotalDto getAccountTotal(String accountGuid) {
        AccountTotalDto accountTotalDto = new AccountTotalDto();
        accountTotalDto.setAccountGuid(accountGuid);
        accountTotalDto.setAccountTotal(transactionRepository.getAccountTotal(accountGuid));
        Account account = accountRepository.findById(accountGuid).get();
        String fullName = account.getName();
        for (Account acc = account.getParent(); acc.getParent()!=null; acc=acc.getParent()){
            fullName = acc.getName() + ":" + fullName;
        }
        accountTotalDto.setAccountFullName(fullName);
        return accountTotalDto;
    }
}