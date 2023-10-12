package com.titi.euro7.controllers;

import com.titi.euro7.entities.Invoice;
import com.titi.euro7.services.InvoiceService;
import com.titi.euro7.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private StripeService stripeService;


    @PostMapping("/create-checkout-session/{id}")
    public ResponseEntity<String> checkout(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id);

        String sessionUrl = stripeService.createCheckoutSession(invoice.getPrice(), invoice.getNrFactura().toString());

        return ResponseEntity.ok(sessionUrl);
    }
}
