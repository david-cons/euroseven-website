package com.titi.euro7.services;


import com.titi.euro7.entities.Invoice;
import com.titi.euro7.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public boolean deleteInvoice(Long id) {
        log.info("Deleting invoice with id " + id);
        if (!invoiceRepository.existsById(id)) {
            log.info("Invoice with id " + id + " does not exist");
            return false;
        }
        invoiceRepository.deleteById(id);
        return true;
    }

    public List<Invoice> searchInvoiceByNrFactura(Integer nrFactura) {
        log.info("Searching for invoice with nrFactura " + nrFactura);
        List<Invoice> invoices = invoiceRepository.findAll();
        List<Invoice> searchResult = new ArrayList<>();
        for (Invoice invoice : invoices) {
            Integer nrFactura1 = invoice.getNrFactura();
            if (nrFactura1 != null && nrFactura1.toString().contains(nrFactura.toString())) {
                searchResult.add(invoice);
            }
        }
        return searchResult;
    }

    public List<Invoice> findPaidInvoices() {
        return invoiceRepository.findInvoicesByPaidIsTrue();
    }

    public List<Invoice> findUnpaidInvoices() {
        return invoiceRepository.findInvoicesByPaidIsFalse();
    }
}
