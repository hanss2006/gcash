package com.hanss.gcash.repository;

import com.hanss.gcash.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByName(String name);
    Page<Account> findByNameContainingIgnoreCaseAndAccountTypeIn(String name, List<String> accountTypes, Pageable pageable);
}
