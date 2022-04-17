package com.hanss.gcash.controller;

import com.hanss.gcash.model.Account;
import com.hanss.gcash.model.AccountMapper;
import com.hanss.gcash.model.AccountShortDto;
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

import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

/*
@CrossOrigin(origins = "*", maxAge = 3600)
*/
@RestController
@RequestMapping("/account")
public class AccountController {
    public static final String ROOT_ACCOUT_GUID = "124b2ad3633e2b6c8ff26505730c09a7";
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    private List<String> accTypes = Arrays.asList("EXPENSE", "ASSET", "BANK", "INCOME", "CASH", "CREDIT");

    @GetMapping("/")
    @Operation(summary = "Get accounts", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Page<AccountShortDto>> getAllAccounts(
            @RequestParam(required = false) String queryString,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        try {
            String query = (queryString==null)? "" : queryString;
            Pageable paging = PageRequest.of(page
                    , size
                    , sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending());

            Page<AccountShortDto> accountPage;
            accountPage = accountRepository.findByNameContainingIgnoreCaseAndAccountTypeInAndCommodityScuEqualsAndPlaceholderEquals(
                    query, accTypes, 100, 0, paging
            ).map(mapToAccountShortDto);
            return new ResponseEntity<>(accountPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get tree account", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/tree")
    public ResponseEntity<AccountTreeDto> getAllDetails(
            @RequestParam(value="guid", defaultValue="root", required = false) String guid
    ) {
        String accoutGuid;
        if ( guid==null || guid.isEmpty() || guid.equalsIgnoreCase("root") ){
            accoutGuid = ROOT_ACCOUT_GUID;
        } else {
            accoutGuid = guid;
        }
        return accountRepository.findById(accoutGuid).map(mapToAccountTreeDto).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

   private Function<Account, AccountTreeDto> mapToAccountTreeDto = p -> accountMapper.toTreeDto(p);
   private Function<Account, AccountShortDto> mapToAccountShortDto = p -> accountMapper.toShortDto(p);
}
