package com.titi.euro7.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content")
    private String content;

    @Column(name="cod_client")
    private Integer codClient;

    @Column(name="completed")
    private boolean completed;

    public Notification(String content, Integer codClient) {
        this.content = content;
        this.codClient = codClient;
        this.completed = false;
    }

    public Notification(Long id, String content, Integer codClient, boolean completed) {
        this.id = id;
        this.content = content;
        this.codClient = codClient;
        this.completed = completed;
    }

    public Notification() {

    }
}
