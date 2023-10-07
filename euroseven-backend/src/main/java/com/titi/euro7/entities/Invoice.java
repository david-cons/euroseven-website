package com.titi.euro7.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(pattern = "MM/dd/yyyy")
    private LocalDate created_date;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "MM/dd/yyyy")
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

    @Column(name="index_vechi")
    private double indexVechi;

    @Column(name="index_nou")
    private double indexNou;

    public Invoice(LocalDate created_date, double price, String file, Integer codClient) {
        this.created_date = created_date;
        this.price = price;
        this.file = file;
        this.codClient = codClient;
    }

    public Invoice() {

    }
}

