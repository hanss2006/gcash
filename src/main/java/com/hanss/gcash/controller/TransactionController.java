package com.hanss.gcash.controller;

import com.hanss.gcash.model.TransactionFullDto;
import com.hanss.gcash.model.TransactionShortDto;
import com.hanss.gcash.repository.TransactionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/transaction")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    private Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @Operation(summary = "Get transactions by account guid", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/account/{accoutGuid}")
    public ResponseEntity<?> getTransaction(
            @PathVariable("accoutGuid") String accoutGuid,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        try {
            Pageable paging = PageRequest.of(page, size);
            Page<TransactionShortDto> transactionShortDtoPage = transactionRepository.findByAccountGuidNative(accoutGuid, paging);
            return new ResponseEntity<Page<TransactionShortDto>>(transactionShortDtoPage, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Get account sum by account guid", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/sum/account/{accoutGuid}")
    public ResponseEntity<?> getAccountTotal(
            @PathVariable("accoutGuid") String accoutGuid
    ) {
        try {
            return new ResponseEntity<>(
                    transactionRepository.getAccountTotal(accoutGuid),
                    HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/",
            method = RequestMethod.POST,
            produces = { MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    @Operation(summary = "Add transaction", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> addTransaction(@RequestBody TransactionFullDto transactionFullDto) {
        try {
            return new ResponseEntity<>(
                    transactionService.addTransaction(transactionFullDto),
                    HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/",
            method = RequestMethod.PUT,
            produces = { MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    @Operation(summary = "Update transaction", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<?> updateTransaction(@RequestBody TransactionFullDto transactionFullDto) {
        try {
            return new ResponseEntity<>(
                    transactionService.updateTransaction(transactionFullDto),
                    HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{transactionGuid}",
            method = RequestMethod.DELETE,
            produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseBody
    @Operation(summary = "Delete transaction", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity deleteTransaction(@PathVariable("transactionGuid") String transactionGuid) {
        try {
            transactionService.deleteTransaction(transactionGuid);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            logger.error(e.getCause().getMessage());
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
