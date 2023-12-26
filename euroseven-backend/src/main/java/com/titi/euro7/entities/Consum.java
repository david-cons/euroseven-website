package com.titi.euro7.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("SpellCheckingInspection")
@Data
@Entity
@Table(name = "consum")
@Getter
@Setter
public class Consum {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod")
    private String cod;

    @Column(name = "nrfactura")
    private String nrFactura;

    @Column(name = "deplata")
    private String dePlata;

    @Column(name = "indexvechi")
    private String indexVechi;

    @Column(name = "indexnou")
    private String indexNou;

    @Column(name = "consum")
    private String consumT;

    @Column(name = "perioada")
    private String perioada;


    public Consum(Long id, String cod, String nrFactura, String dePlata, String indexVechi, String indexNou, String consumT, String perioada) {
        this.id = id;
        this.cod = cod;
        this.nrFactura = nrFactura;
        this.dePlata = dePlata;
        this.indexVechi = indexVechi;
        this.indexNou = indexNou;
        this.consumT = consumT;
        this.perioada = perioada;
    }

    public Consum(String cod, String nrFactura, String dePlata, String indexVechi, String indexNou, String consumT, String perioada) {
        this.cod = cod;
        this.nrFactura = nrFactura;
        this.dePlata = dePlata;
        this.indexVechi = indexVechi;
        this.indexNou = indexNou;
        this.consumT = consumT;
        this.perioada = perioada;
    }

    public Consum() {

    }
}
