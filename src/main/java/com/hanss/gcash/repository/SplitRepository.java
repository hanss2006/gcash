package com.hanss.gcash.repository;

import com.hanss.gcash.model.Split;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SplitRepository extends JpaRepository<Split, String> {

}