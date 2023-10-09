package com.titi.euro7.controllers;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.titi.euro7.dto.InvoiceDTO;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.Payment;
import com.titi.euro7.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/nrFactura/{nrFactura}")
    public ResponseEntity<Invoice> findInvoiceByNrFactura(@PathVariable Integer nrFactura) {
        return ResponseEntity.ok(invoiceService.getInvoiceByNrFactura(nrFactura));
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
    public ResponseEntity<List<Invoice>> searchInvoiceByNrFactura(@RequestParam String keyword) {
        return ResponseEntity.ok(invoiceService.searchInvoiceByNrFacturaOrCodClient(keyword));
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

    @GetMapping("/nrFacturi/{codClient}")
    public ResponseEntity<List<InvoiceDTO>> getAllNrsFacturi(@PathVariable Integer codClient) {return ResponseEntity.ok(invoiceService.getAllNrsFacturaByCodClient(codClient)); }


    @GetMapping("/payments/search")
    public ResponseEntity<List<Payment>> searchPaymentByNumeOrCodClient(@RequestParam String keyword) {
        return ResponseEntity.ok(invoiceService.searchPaymentByNumeOrCodClient(keyword));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestParam @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "MM/dd/yyyy") LocalDate created_date, @RequestParam double price, @RequestParam String file) {
        return ResponseEntity.ok(invoiceService.updateInvoice(id, created_date, price, file));
    }

    @PostMapping("/payments/delete/{id}")
    public ResponseEntity<Boolean> deletePayment(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.deletePayment(id));
    }

}
