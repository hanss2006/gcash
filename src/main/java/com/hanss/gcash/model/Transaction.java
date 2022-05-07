package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hanss.gcash.common.Constants;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
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
    private String currencyGuid = Constants.RUB;

    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String num = "";

    @NotNull
    @Column(name = "post_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Getter
    @Setter
    LocalDateTime  postDate;

    @NotNull
    @Column(name = "enter_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Getter
    @Setter
    LocalDateTime  enterDate;

    @NotBlank
    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "transaction")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Getter
    private Set<Split> splits;
}
