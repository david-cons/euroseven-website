package com.titi.euro7.services;


import com.titi.euro7.entities.Email;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class EmailService {

    Logger log = Logger.getLogger(EmailService.class.getName());

    @Autowired
    private InvoiceService invoiceService;

    @Autowire
    private UserService userService;


    public List<Email> createEmailsBasedOnUnpaidInvoices() {
        List<User> users = userService.getAllUsers();
        HashMap<User, List<Invoice>> userInvoices = new HashMap<User, List<Invoice>>();

        for (User user : users) {
            userInvoices.put(user, this.invoiceService.getInvoicesByUserId(user.id));
        }

        List<Email> result = new List<Email>();

        for () {
            result.add(this.invoiceService());
        }

        return result;
    }
    public void sendEmail(Email email){

    }

    private Email fromInvoicesToEmail(List<invoice> invoice) {

    }
}
