package com.titi.euro7.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddSaldoDTO {

    private Double amount;

    @JsonCreator
    public AddSaldoDTO(@JsonProperty("amount")Double amount) {
        this.amount = amount;
    }

}
