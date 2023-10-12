package com.titi.euro7.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class InvoiceDTO {

    private Integer nrFactura;

    private double restDePlata;

    private LocalDate created_date;

    public InvoiceDTO(Integer nrFactura, double restDePlata, LocalDate created_date) {
        this.nrFactura = nrFactura;
        this.restDePlata = restDePlata;
        this.created_date = created_date;
    }
}
