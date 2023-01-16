package com.hanss.gcash.repository;

import com.hanss.gcash.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    @Query(
            value = "SELECT " +
                    "  guid, name, account_type, commodity_guid, commodity_scu, non_std_scu, " +
                    "  parent_guid, code, description, hidden, placeholder " +
                    "FROM " +
                    "  accounts a " +
                    "WHERE " +
                    "  a.account_type IN ('EXPENSE', 'ASSET', 'BANK', 'INCOME', 'CASH', 'CREDIT') AND " +
                    "  a.placeholder = 0 AND " +
                    "  a.commodity_scu = 100 AND " +
                    "  a.status = ?1 " +
                    "ORDER BY name",
            nativeQuery = true)
    List <Account> findByGuidNative(String guid);

    Page<Account> findByNameContainingIgnoreCaseAndAccountTypeInAndCommodityScuEqualsAndPlaceholderEquals(
            String name, List<String> accountTypes, Integer commodityScu, Integer placeholder, Pageable pageable
    );
}
