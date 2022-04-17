package com.hanss.gcash.controller;

import com.hanss.gcash.model.TransactionShortDto;
import com.hanss.gcash.repository.TransactionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/*
@CrossOrigin(origins = "*", maxAge = 3600)
*/
@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Operation(summary = "Get transactions by account guid", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/{accoutGuid}")
    public ResponseEntity<?> getTransaction(
            @PathVariable("accoutGuid") String accoutGuid,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<TransactionShortDto> transactionShortDtoPage = transactionRepository.findByAccountGuidNative(accoutGuid, paging);
            return new ResponseEntity<Page<TransactionShortDto>>(transactionShortDtoPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
