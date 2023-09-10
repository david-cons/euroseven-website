package com.titi.euro7.entities;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;


@Getter
@Setter
public class Email {

    private String to;
    private String content;
    private String subject;
    private LocalDate creation_date;
    public Email(String to, String content, String subject, String creation_date){
        this.to = to;
        this.content = content;
        this.subject = subject;
        this.creation_date = creation_date;
    }
    public Email() {}
}

