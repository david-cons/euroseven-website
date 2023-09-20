package com.titi.euro7.entities;


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

    private LocalDate created_date;

    private LocalDate due_date;

    private Long personal_details_id;

    private float price;

    private String file;

    private Boolean paid;

    @Column(name = "nr_factura")
    private Integer nrFactura;

    public Invoice(Long id, LocalDate created_date, LocalDate due_date, float price, String file, Boolean paid) {
        this.id = id;
        this.created_date = created_date;
        this.due_date = due_date;
        this.price = price;
        this.file = file;
        this.paid = paid;
    }

    public Invoice() {

    }
}

