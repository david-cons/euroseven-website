package com.titi.euro7.services;


import com.titi.euro7.entities.PersonalDetails;
import com.titi.euro7.repositories.PersonalDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class PersonalDetailsService {

    Logger log = Logger.getLogger(InvoiceService.class.getName());

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    public getPersonalDetailsById(Long id) {
        log.info("Retrieving personal data with id " + id);
        return personalDetailsRepository.findById(id).orElse(null);
    }

}