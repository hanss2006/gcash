package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class TransactionFullDto {
    @Size(max = 32)
    private String transactionGuid;
    @Size(max = 32)
    private String currentAccountGuid;
    @Size(max = 32)
    private String accountGuid;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDate postDate;
    @Size(max = 2048)
    private String description;
    private Double value;
}
