package com.titi.euro7.controllers;


import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.Payment;
import com.titi.euro7.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InvoiceController {


    @Autowired
    private InvoiceService invoiceService;


    @GetMapping("/{id}")
    public ResponseEntity<Invoice> findInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteInvoice(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.deleteInvoice(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Invoice>> searchInvoiceByNrFactura(@RequestParam Integer nrFactura) {
        return ResponseEntity.ok(invoiceService.searchInvoiceByNrFactura(nrFactura));
    }

    @GetMapping("/paid")
    public ResponseEntity<List<Invoice>> findPaidInvoices() {
        return ResponseEntity.ok(invoiceService.findPaidInvoices());
    }

    @GetMapping("/unpaid")
    public ResponseEntity<List<Invoice>> findUnpaidInvoices() {
        return ResponseEntity.ok(invoiceService.findUnpaidInvoices());
    }

    @PostMapping("/pay")
    public ResponseEntity<Payment> payInvoice(@RequestBody Payment payment) {
        return ResponseEntity.ok(invoiceService.registerPayment(payment));
    }

    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(invoiceService.getAllPayments());
    }
}
