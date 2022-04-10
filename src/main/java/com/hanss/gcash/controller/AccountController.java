package com.hanss.gcash.controller;

import com.hanss.gcash.model.Account;
import com.hanss.gcash.repository.AccountRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
@CrossOrigin(origins = "*", maxAge = 3600)
*/
@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/")
    @Operation(summary = "Get accounts", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<Account>> getAllAccounts(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        try {
            Pageable paging = PageRequest.of(page
                    , size
                    , sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());
            Page<Account> accountPage;
            if (name == null)
                accountPage = accountRepository.findAll(paging);
            else
                accountPage = accountRepository.findByNameContainingIgnoreCase(name, paging);
            return new ResponseEntity<>(accountPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
