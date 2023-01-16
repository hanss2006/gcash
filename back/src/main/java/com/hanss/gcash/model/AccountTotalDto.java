package com.hanss.gcash.model;

import lombok.Data;

@Data
public class AccountTotalDto {
    private String accountGuid;
    private String accountFullName;
    private Double accountTotal;
}
