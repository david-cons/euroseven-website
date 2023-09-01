package com.titi.euro7.services;


import com.titi.euro7.entities.Invoice;
import com.titi.euro7.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class InvoiceService {

    Logger log = Logger.getLogger(InvoiceService.class.getName());

    @Autowired
    private InvoiceRepository invoiceRepository;

    public Invoice getInvoiceById(Long id) {
        log.info("Retrieving invoice with id " + id);
        return invoiceRepository.findById(id).orElse(null);
    }

    public List<Invoice> getAllInvoices() {
        log.info("Getting all invoices");
        return invoiceRepository.findAll();
    }

    public Invoice createInvoice(Invoice invoice) {
        log.info("Saving invoice ");
        return invoiceRepository.save(invoice);
    }
}
