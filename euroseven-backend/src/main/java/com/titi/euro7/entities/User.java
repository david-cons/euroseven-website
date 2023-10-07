package com.titi.euro7.entities;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@Table(name = "user")
@Entity
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // email is the username
    @NonNull
    @Column(name = "username")
    private String username;

    @NonNull
    @Column(name = "password")
    private String password;

    @Column(name = "inactive")
    private Boolean inactive;

    @Column(name = "saldo")
    private double saldo;

    @Column(name = "role")
    private String role;

    @Column(name = "name")
    private String name;

    @Column(name = "cod_client")
    private Integer codClient;

    @Column(name = "address")
    private String address;

    @Column(name = "judet")
    private String judet;
    @Column(name = "localitate")
    private String localitate;

    @Column(name = "phone")
    private String phone;

    @Lob
    @Column(name = "picture", columnDefinition = "TEXT")
    private String image;

    @Column(name = "de_plata_total")
    private double restDePlataTotal;


    public User(@NonNull String username, @NonNull String password) {
        this.username = username;
        this.password = password;
        this.inactive = false;
        this.saldo = 0;
    }

    public User() {

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
