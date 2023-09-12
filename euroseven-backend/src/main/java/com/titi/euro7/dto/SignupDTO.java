package com.titi.euro7.dto;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;


@Getter
@Setter
public class SignupDTO {

    @NonNull
    private String username;

    @NonNull
    private String password;

    @NonNull
    private String role;

}