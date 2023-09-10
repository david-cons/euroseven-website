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

    private Long user_id;

    private LocalDate created_date;

    private LocalDate due_date;

    private Long personal_details_id;

    private float price;

    private String file;

    private Boolean paid;

    private String customer_number;
    private String customer_name;
    private String customer_code;
    private String customer_email;

    public Invoice(Long id, LocalDate created_date, LocalDate due_date, Long personal_details_id, float price, String file, Boolean paid, String customer_number, String customer_name, String customer_code, String customer_email) {
        this.id = id;
        this.created_date = created_date;
        this.due_date = due_date;
        this.personal_details_id = personal_details_id;
        this.price = price;
        this.file = file;
        this.paid = paid;
        this.customer_number = customer_number;
        this.customer_name = customer_name;
        this.customer_code = customer_code;
        this.customer_email = customer_email;
    }

    public Invoice() {

    }
}

