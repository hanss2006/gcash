package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime ;

public interface TransactionShortDto {
    String getGuid();
    String getDescription();
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    LocalDateTime  getPostDate();
    BigDecimal getValue();
    String getAccountGuid();
    String getCurrentAccountGuid();
}
