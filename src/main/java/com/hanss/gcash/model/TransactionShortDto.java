package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface TransactionShortDto {
    String getGuid();
    String getDescription();
    @JsonFormat(pattern="yyyy-MM-dd")
    LocalDate getPostDate();
    BigDecimal getValue();
    String getAccountGuid();
    String getCurrentAccountGuid();
}
