package com.hanss.gcash.model;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountTreeDto toTreeDto(Account model);
    AccountShortDto toShortDto(Account model);
}