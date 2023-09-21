package com.titi.euro7.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "invoice")
@Getter
@Setter
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate created_date;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate due_date;

    private double price;

    private String file;

    private Boolean paid;

    @Column(name = "nr_factura")
    private Integer nrFactura;

    @Column(name="cod_client")
    private Integer codClient;

    @Column(name="rest_de_plata")
    private double restDePlata;

    public Invoice(Long id, LocalDate created_date, double price, String file, Integer nrFactura, Integer codClient, double restDePlata) {
        this.id = id;
        this.created_date = created_date;
        this.due_date = created_date.plusMonths(1);
        this.price = price;
        this.restDePlata = restDePlata;
        this.file = file;
        this.paid = false;
        this.nrFactura = nrFactura;
        this.codClient = codClient;
    }

    public Invoice() {

    }
}

