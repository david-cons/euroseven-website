package com.titi.euro7.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "personaldetails")
@Getter
@Setter
public class PersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long user_id;

    private String address;

    private String postcode;

    private String password;

    private String phone;

    public PersonalDetails(Long id, Long user_id, String address, String postcode, String password, String phone) {
        this.id = id;
        this.user_id = user_id;
        this.address = address;
        this.postcode = postcode;
        this.password = password;
        this.phone = phone;
    }

    public PersonalDetails() {

    }

}

