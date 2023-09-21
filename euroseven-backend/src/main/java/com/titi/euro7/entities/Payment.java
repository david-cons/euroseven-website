package com.titi.euro7.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "payments")
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date;

    private double amount;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "cod_client")
    private int codClient;

    @Column(name = "invoice_id")
    private Long invoiceId;

    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "payment_method")
    private String paymentMethod;

    public Payment(Long id, LocalDate date, double amount, Long userId, Long invoiceId, Long adminId, String paymentMethod) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.userId = userId;
        this.invoiceId = invoiceId;
        this.adminId = adminId;
        this.paymentMethod = paymentMethod;
    }

    public Payment() {

    }
}
