package com.titi.euro7.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Data
@Table(name = "user")
@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String username;

    @NonNull
    private String email;

    @NonNull
    private Boolean inactive;

    @NonNull
    private float saldo;

    public User(Long id, @NonNull String username, @NonNull String email, @NonNull Boolean inactive, @NonNull float saldo) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.inactive = inactive;
        this.saldo = saldo;
    }

    public User() {

    }

}
