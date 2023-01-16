package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import jakarta.validation.constraints.Size;
import java.time.LocalDateTime ;

@Data
public class TransactionFullDto {
    @Size(max = 32)
    private String guid;
    @Size(max = 32)
    private String currentAccountGuid;
    @Size(max = 32)
    private String accountGuid;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime  postDate;
    @Size(max = 2048)
    private String description;
    private Double value;
}
