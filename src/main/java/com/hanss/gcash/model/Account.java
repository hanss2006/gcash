package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "accounts",
        uniqueConstraints = {
                @UniqueConstraint(name = "UniqueName", columnNames = "name")
        })
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernate_lazy_initializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @Size(max = 32)
    @Column(length = 32)
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String guid;

    @NotBlank
    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String name;

    @NotBlank
    @Size(max = 2048)
    @Column(name = "account_type", length = 2048)
    @Getter
    @Setter
    private String accountType;

    @NotBlank
    @Column(name = "commodity_scu")
    @Getter
    @Setter
    private Integer commodityScu;

    @NotBlank
    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String description;

    @Size(max = 32)
    @Column(length = 32)
    @Getter
    @Setter
    private String parent_guid;

    @ManyToOne(fetch = FetchType.EAGER)
    @Getter
    @Setter
    @JoinColumn(name = "parent_guid", insertable = false, updatable = false)
    private Account parent;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<Account> children;

    @JsonIgnore
    public Set<Account> getChildren() {
        return this.children;
    }

    @NotBlank
    @Getter
    @Setter
    private Integer placeholder;
}
