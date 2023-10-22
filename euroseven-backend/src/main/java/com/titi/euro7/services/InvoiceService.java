package com.titi.euro7.services;


import com.titi.euro7.dto.InvoiceDTO;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.Payment;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.InvoiceRepository;
import com.titi.euro7.repositories.PaymentRepository;
import com.titi.euro7.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import static com.titi.euro7.services.UserService.isNumeric;

@Service
public class InvoiceService {

    Logger log = Logger.getLogger(InvoiceService.class.getName());

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    public Invoice getInvoiceById(Long id) {
        log.info("Retrieving invoice with id " + id);
        return invoiceRepository.findById(id).orElse(null);

    }

    public Invoice getInvoiceByNrFactura(Integer nrFactura) {
        log.info("Retrieving invoice with nrFactura " + nrFactura);
        return invoiceRepository.findByNrFactura(nrFactura);
    }

    public List<Invoice> getAllInvoices() {
        log.info("Getting all invoices");
        return invoiceRepository.findAll();
    }


    public Invoice uploadInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Invoice createInvoice(Invoice invoice) {
        log.info("Saving invoice ");
        User user = userRepository.findByCodClient(invoice.getCodClient());
        if (user == null) {
            log.info("User with codClient " + invoice.getCodClient() + " does not exist");
            return null;
        }
        try {
            invoice.setDue_date(invoice.getCreated_date().plusMonths(1));
            invoice.setPaid(false);
            invoice.setRestDePlata(invoice.getPrice());
            invoice.setIndexVechi(0.0); // TODO: Change This
            invoice.setIndexNou(0.0); // TODO: Change This

            if (user.getSaldo() <= invoice.getPrice()) {
                invoice.setRestDePlata(invoice.getRestDePlata() - user.getSaldo());
                user.setSaldo(0.0);
                if (invoice.getRestDePlata() == 0) {
                    invoice.setPaid(true);
                } else {
                    user.setRestDePlataTotal(user.getRestDePlataTotal() + invoice.getRestDePlata());
                }
            } else {
                invoice.setRestDePlata(0);
                invoice.setPaid(true);
                user.setSaldo(user.getSaldo() - invoice.getPrice());
            }
            userRepository.save(user);
        } catch (java.time.format.DateTimeParseException e) {
            log.info("Error parsing the date: " + e.getMessage());
        }
        return invoiceRepository.save(invoice);
    }

    public boolean deleteInvoice(Long id) {
        log.info("Deleting invoice with id " + id);
        if (!invoiceRepository.existsById(id)) {
            log.info("Invoice with id " + id + " does not exist");
            return false;
        }
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        assert invoice != null;
        User user = userRepository.findByCodClient(invoice.getCodClient());
        if (invoice.getPaid()) {
            user.setSaldo(user.getSaldo() + invoice.getPrice() - invoice.getRestDePlata());
        }
        user.setRestDePlataTotal(user.getRestDePlataTotal() - invoice.getRestDePlata());
        userRepository.save(user);
        invoiceRepository.delete(invoice);
        return true;
    }

    public List<Invoice> searchInvoiceByNrFacturaOrCodClient(String keyword) {
        log.info("Searching for invoice with nr. factura / cod client " + keyword);
        List<Invoice> invoices = invoiceRepository.findAll();
        List<Invoice> searchResult = new ArrayList<>();
        for (Invoice invoice : invoices) {
            int codClient = invoice.getCodClient();
            if (Integer.toString(codClient).startsWith(keyword)) {
                searchResult.add(invoice);
            } else if (Integer.toString(invoice.getNrFactura()).startsWith(keyword)) {
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

    public Payment registerPayment(Payment payment) {
        Invoice invoice = invoiceRepository.findByNrFactura(payment.getNrFactura());
        User user = userRepository.findById(payment.getUserId()).orElse(null);
        if (invoice == null) {
            log.info("Invoice with nr " + payment.getNrFactura() + " does not exist");
            return null;
        }
        if (invoice.getRestDePlata() != 0) {
            if (payment.getAmount() > invoice.getRestDePlata()) {
                log.info("Payment amount is greater than the rest to be paid");
                return null;
            }
            assert user != null;
            payment.setCodClient(user.getCodClient());
            payment.setUserName(user.getName());
            if (payment.getAmount() <= invoice.getRestDePlata()) {
                invoice.setRestDePlata(invoice.getRestDePlata() - payment.getAmount());
                if (invoice.getRestDePlata() == 0) {
                    invoice.setPaid(true);
                }
                user.setRestDePlataTotal(user.getRestDePlataTotal() - payment.getAmount());
            } else {
                invoice.setRestDePlata(0);
                invoice.setPaid(true);
                user.setRestDePlataTotal(user.getRestDePlataTotal() - invoice.getRestDePlata());
            }

            payment.setDate(LocalDateTime.parse(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
            userRepository.save(user);
            invoiceRepository.save(invoice);
            return paymentRepository.save(payment);
        }
        return null;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<InvoiceDTO> getAllNrsFacturaByCodClient(Integer codClient) {
        return invoiceRepository.findAllNrFacturaByCodClient(codClient);
    }

    public List<Payment> searchPaymentByNumeOrCodClient(String keyword) {
        log.info("Searching for payment with keyword " + keyword);
        List<Payment> payments = paymentRepository.findAll();
        List<Payment> searchResult = new ArrayList<>();
        if (isNumeric(keyword)) {
            for (Payment payment : payments) {
                int codClient = payment.getCodClient();
                if (Integer.toString(codClient).startsWith(keyword)) {
                    searchResult.add(payment);
                }
            }
        } else {
            for (Payment payment : payments) {
                String name = payment.getUserName();
                if (name != null && name.startsWith(keyword)) {
                    searchResult.add(payment);
                }
            }
        }
        return searchResult;
    }


    public Invoice updateInvoice(Long id, LocalDate created_date, double price, String file) {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        if (invoice == null) {
            log.info("Invoice with id " + id + " does not exist");
            return null;
        }
        invoice.setCreated_date(created_date);
        invoice.setDue_date(created_date.plusMonths(1));
        invoice.setFile(file);
        User user = userRepository.findByCodClient(invoice.getCodClient());
        if (user == null) {
            log.info("User with codClient " + invoice.getCodClient() + " does not exist");
            return null;
        }

        if (price != invoice.getPrice()) {

            double priceDifference = price - invoice.getPrice();

            // If the price increased
            if (priceDifference > 0) {
                invoice.setRestDePlata(invoice.getRestDePlata() + priceDifference);
                user.setRestDePlataTotal(user.getRestDePlataTotal() + priceDifference);
                if (invoice.getPaid()) {
                    invoice.setPaid(false);
                }
            }
            // If the price decreased
            else if (priceDifference < 0) {
                invoice.setRestDePlata(invoice.getRestDePlata() + priceDifference); // Decrease it
               // user.setRestDePlataTotal(user.getRestDePlataTotal() + priceDifference);

                if (invoice.getRestDePlata() < 0) {
                    user.setSaldo(user.getSaldo() - invoice.getRestDePlata()); // Convert negative value to positive
                    invoice.setRestDePlata(0);
                    invoice.setPaid(true);
                }
            }

            // Update the invoice price
            invoice.setPrice(price);

            userRepository.save(user);
        }
        return invoiceRepository.save(invoice);
    }

    public boolean deletePayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId).orElse(null);

        if (payment == null) {
            log.info("Payment with ID " + paymentId + " does not exist");
            return false;
        }

        Invoice invoice = invoiceRepository.findByNrFactura(payment.getNrFactura());
        if (invoice == null) {
            log.info("Invoice with nr " + payment.getNrFactura() + " does not exist");
            return false;
        }

        User user = userRepository.findByCodClient(invoice.getCodClient());
        if (user == null) {
            log.info("User with codClient " + invoice.getCodClient() + " does not exist");
            return false;
        }

        // Add back the payment amount to invoice's and user's rest to pay.
        invoice.setRestDePlata(invoice.getRestDePlata() + payment.getAmount());
        user.setRestDePlataTotal(user.getRestDePlataTotal() + payment.getAmount());

        if (invoice.getRestDePlata() > 0) {
            invoice.setPaid(false); // Set the invoice as unpaid
        }

        // Save updated invoice and user
        invoiceRepository.save(invoice);
        userRepository.save(user);

        // Delete the payment
        paymentRepository.delete(payment);

        return true;
    }

    public Integer getCountUnpaidInvoices(Integer codClient) {
        List<Invoice> invoices = invoiceRepository.findAllUnpaidInvoicesByCodClient(codClient);
        return invoices.size();
    }

    public List<Payment> getAllPaymentsByCodClient(Integer codClient) {

        List<Payment> payments = paymentRepository.findAllByCodClient(codClient);

        if (payments.size() <= 5) {
            return payments;
        }
        return payments.subList(payments.size() - 5, payments.size());
    }

    public List<Invoice> findAllByCodClient(Integer codClient) {
        return invoiceRepository.findAllByCodClient(codClient);
    }

}
