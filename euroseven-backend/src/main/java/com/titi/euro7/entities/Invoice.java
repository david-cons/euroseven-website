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

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private INVOICE_STATUS status;

    @Column(name = "location")
    private String location;

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

    public Invoice(Long id, LocalDate created_date, LocalDate due_date, double price, String file, INVOICE_STATUS status, String location, Integer nrFactura, Integer codClient, double restDePlata, double indexVechi, double indexNou) {
        this.id = id;
        this.created_date = created_date;
        this.due_date = due_date;
        this.price = price;
        this.file = file;
        this.status= status;
        this.location = location;
        this.nrFactura = nrFactura;
        this.codClient = codClient;
        this.restDePlata = restDePlata;
        this.indexVechi = indexVechi;
        this.indexNou = indexNou;
    }

    public Invoice() {

    }
}

