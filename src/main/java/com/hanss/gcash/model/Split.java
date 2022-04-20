package com.hanss.gcash.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hanss.gcash.common.Constants;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Formula;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "splits")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernate_lazy_initializer", "handler"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Split {
    @Id
    @Size(max = 32)
    @Column(length = 32)
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private String guid;

    @Size(max = 32)
    @Column(name = "tx_guid", length = 32)
    @Getter
    @Setter
    private String txGuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    @JoinColumn(name = "tx_guid", insertable = false, updatable = false)
    private Transaction transaction;

    @Size(max = 32)
    @Column(name = "account_guid", length = 32)
    @Getter
    @Setter
    private String accountGuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    @JoinColumn(name = "account_guid", insertable = false, updatable = false)
    private Account account;

    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String memo = Constants.SPLIT_MEMO_WEBAPP;

    @Size(max = 2048)
    @Column(length = 2048)
    @Getter
    @Setter
    private String action = "";

    @Size(max = 1)
    @Column(name = "reconcile_state", length = 1)
    @Getter
    @Setter
    private String reconcileState = Constants.SPLIT_RECONCILE_STATE_N;

    @Column(name = "value_num")
    @Getter
    @Setter
    private Long valueNum;

    @Column(name = "value_denom")
    @Getter
    @Setter
    private Long valueDenom;

    @Column(name = "quantity_num")
    @Getter
    @Setter
    private Long quantityNum;

    @Column(name = "quantity_denom")
    @Getter
    @Setter
    private Long quantityDenom;

    @Formula("ROUND(quantityNum/quantityDenom, 2)")
    @Getter
    private Double value;
}
