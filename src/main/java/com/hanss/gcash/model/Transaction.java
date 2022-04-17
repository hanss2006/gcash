package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "transactions")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernate_lazy_initializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @Size(max = 32)
    @Column(length = 32)
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String guid;

    @Size(max = 32)
    @Column(name = "currency_guid", length = 32)
    @Getter
    @Setter
    private String currencyGuid = "eecd73e9d75ee21ffcc4a773eb9831a8";

    @NotBlank
    @Column(name = "post_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    @Getter
    @Setter
    LocalDate postDate;

    @NotBlank
    @Column(name = "enter_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    @Getter
    @Setter
    LocalDate enterDate;

    @NotBlank
    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "transaction")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<Split> splits;
}
