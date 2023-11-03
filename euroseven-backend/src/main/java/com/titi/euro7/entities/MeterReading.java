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
@Table(name="meter_reading")
@Getter
@Setter
public class MeterReading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="serie_contor")
    private String serieContor;

    @Column(name="index_vechi")
    private double indexVechi;

    @Column(name="index_nou")
    private double indexNou;

    @Column(name="cod_client")
    private Integer codClient;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "MM/dd/yyyy")
    @Column(name="date")
    private LocalDate date;

    @Lob
    @Column(name = "picture", columnDefinition = "TEXT")
    private String picture;

    @Column(name="accepted")
    private Boolean accepted;

    public MeterReading(Long id, double indexVechi, double indexNou, Integer codClient, LocalDate date, String picture) {
        this.id = id;
        this.indexVechi = indexVechi;
        this.indexNou = indexNou;
        this.codClient = codClient;
        this.date = date;
        this.picture = picture;
    }

    public MeterReading() {

    }
}
