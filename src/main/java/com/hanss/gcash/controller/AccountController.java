package com.hanss.gcash.controller;

import com.hanss.gcash.model.Account;
import com.hanss.gcash.model.AccountTreeDto;
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
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    @Operation(summary = "Get tree account", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{guid}")
    public ResponseEntity<AccountTreeDto> getAllDetails(
            @PathVariable("guid")
            @RequestParam(value="guid", defaultValue="root", required = false) String guid
    ) {
        String accoutGuid;
        if (guid.equalsIgnoreCase("root") || guid.isEmpty() ){
            accoutGuid = "124b2ad3633e2b6c8ff26505730c09a7";
        } else {
            accoutGuid = guid;
        }
        return accountRepository.findById(accoutGuid).map(mapToAccountTreeDto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Get tree account siblings", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{guid}/siblings")
    public ResponseEntity<Set<AccountTreeDto>> getAllSiblings(@PathVariable("guid") String guid) {
        return accountRepository.findById(guid).map(findSiblings).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Function<Account, Set<AccountTreeDto>> findSiblings = person -> person.getParent().getChildren().stream()
            .map(p -> AccountTreeDto.builder().guid(p.getGuid()).name(p.getName()).build()).collect(Collectors.toSet());

    private Function<Account, AccountTreeDto> mapToAccountTreeDto =
     p -> AccountTreeDto.builder().guid(p.getGuid()).name(p.getName()).parent(p.getParent()).children(p.getChildren()).build();
}
