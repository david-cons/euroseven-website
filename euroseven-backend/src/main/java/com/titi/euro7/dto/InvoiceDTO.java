package com.titi.euro7.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class InvoiceDTO {

    private Integer nrFactura;

    private double restDePlata;

    public InvoiceDTO(Integer nrFactura, double restDePlata) {
        this.nrFactura = nrFactura;
        this.restDePlata = restDePlata;
    }
}
