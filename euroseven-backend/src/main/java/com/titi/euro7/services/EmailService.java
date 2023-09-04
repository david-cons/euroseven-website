package com.titi.euro7.services;


import com.titi.euro7.entities.Email;
import com.titi.euro7.repositories.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class EmailService {

    Logger log = Logger.getLogger(EmailService.class.getName());

    @Autowired
    private InvoiceRepository invoiceRepository;

}
