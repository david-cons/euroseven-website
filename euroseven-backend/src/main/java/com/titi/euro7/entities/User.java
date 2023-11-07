package com.titi.euro7.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name="index_vechi")
    @Nullable
    private double indexVechi;

    @Column(name="index_nou")
    @Nullable
    private double indexNou;

    @Column(name="is_default_password")
    private boolean isDefaultPassword;

    public User(@NonNull String username, @NonNull String password) {
        this.username = username;
        this.password = password;
        this.inactive = false;
    }

    public User() {

    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return this.password;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

}
