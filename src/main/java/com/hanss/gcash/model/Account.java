package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "accounts",
        uniqueConstraints = {
                @UniqueConstraint(name = "UniqueName", columnNames = "name")
        })
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernate_lazy_initializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String guid;

    @NotBlank
    @Size(max = 2048)
    @Getter
    @Setter
    private String name;

    @NotBlank
    @Size(max = 2048)
    @Getter
    @Setter
    private String account_type;

    @NotBlank
    @Size(max = 2048)
    @Getter
    @Setter
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    private Account parent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<Account> children;

    @JsonIgnore
    public Set<Account> getChildren() {
        return this.children;
    }
}
