package com.titi.euro7.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payments")
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime date;

    private double amount;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "cod_client")
    private int codClient;

    @Column(name = "nr_factura")
    private Integer nrFactura;

    @Column(name = "incasari_id")
    private Long incasariId;

    @Column(name = "payment_method")
    private String paymentMethod;

    public Payment(Long id, double amount, Long userId, Integer nrFactura, Long incasariId, String paymentMethod) {
        this.id = id;
        this.amount = amount;
        this.userId = userId;
        this.nrFactura = nrFactura;
        this.incasariId = incasariId;
        this.paymentMethod = paymentMethod;
    }

    public Payment(double amount, LocalDateTime date, String userName, Integer nrFactura, String paymentMethod) {
        this.amount = amount;
        this.date = date;
        this.userName = userName;
        this.nrFactura = nrFactura;
        this.paymentMethod = paymentMethod;
    }

    public Payment() {

    }
}
