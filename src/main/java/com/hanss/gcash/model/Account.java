package com.hanss.gcash.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "accounts",
        uniqueConstraints = {
                @UniqueConstraint(name = "UniqueName", columnNames = "name")
        })
public class Account {
    @Id
    private UUID guid;

    @NotBlank
    @Size(max = 2048)
    private String name;

    public Account() {
    }

    public Account(UUID guid, String name) {
        this.guid = guid;
        this.name = name;
    }

    public UUID getGuid() {
        return guid;
    }

    public void setGuid(UUID guid) {
        this.guid = guid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
