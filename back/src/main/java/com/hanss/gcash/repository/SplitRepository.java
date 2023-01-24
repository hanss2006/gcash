package com.hanss.gcash.repository;

import com.hanss.gcash.model.Split;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SplitRepository extends JpaRepository<Split, String> {
    String deleteByTxGuid(@Param("txGuid") String txGuid);
    List<Split> getByTxGuid(@Param("txGuid") String txGuid);
}