package com.titi.euro7.services;


import com.titi.euro7.dto.InvoiceDTO;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.Payment;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.InvoiceRepository;
import com.titi.euro7.repositories.PaymentRepository;
import com.titi.euro7.repositories.UserRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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


    public void uploadInvoice(Invoice invoice) {

        log.info("Saving invoice with Nr" + invoice.getNrFactura());
        User user = userRepository.findByCodClient(invoice.getCodClient());
        if (user == null) {
            log.info("User with codClient " + invoice.getCodClient() + " does not have an account, saving invoice.");
            invoiceRepository.save(invoice);
        }
        else {
            try {
                if (user.getRestDePlataTotal() < 0) {
                    invoice.setRestDePlata(invoice.getRestDePlata() + user.getRestDePlataTotal());
                    user.setRestDePlataTotal(0.0);
                    if (invoice.getRestDePlata() == 0) {
                        invoice.setPaid(true);
                    } else {
                        user.setRestDePlataTotal(invoice.getRestDePlata());
                    }
                } else {
                    invoice.setRestDePlata(invoice.getPrice());
                    invoice.setPaid(false);
                    user.setRestDePlataTotal(user.getRestDePlataTotal() + invoice.getRestDePlata());
                }
//                if (invoice.getCreated_date().isEqual(LocalDate.now())) {
//                    user.setIndexVechi(invoice.getIndexVechi());
//                    user.setIndexNou(invoice.getIndexNou());
//                }
                user.setIndexVechi(invoice.getIndexVechi());
                user.setIndexNou(invoice.getIndexNou());
                userRepository.save(user);
                invoiceRepository.save(invoice);
                log.info("Saved user and invoice");
            } catch (java.time.format.DateTimeParseException e) {
                log.info("Error parsing the date: " + e.getMessage());
            }
        }

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

            if (user.getRestDePlataTotal() < 0) {
                invoice.setRestDePlata(invoice.getRestDePlata() + user.getRestDePlataTotal());
                user.setRestDePlataTotal(0.0);
                if (invoice.getRestDePlata() == 0) {
                    invoice.setPaid(true);
                } else {
                    user.setRestDePlataTotal(invoice.getRestDePlata());
                }
            } else {
                invoice.setRestDePlata(invoice.getPrice());
                invoice.setPaid(false);
                user.setRestDePlataTotal(user.getRestDePlataTotal() + invoice.getRestDePlata());
            }
            invoice.setIndexVechi(user.getIndexNou());
            user.setIndexVechi(user.getIndexNou());
            user.setIndexNou(invoice.getIndexNou());
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
            user.setRestDePlataTotal(user.getRestDePlataTotal() + invoice.getPrice() - invoice.getRestDePlata());
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
                invoice.setPaid(true);
                user.setRestDePlataTotal(user.getRestDePlataTotal() - invoice.getRestDePlata());
                invoice.setRestDePlata(0);
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
                    user.setRestDePlataTotal(user.getRestDePlataTotal() - invoice.getRestDePlata()); // Convert negative value to positive
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

    public XSSFWorkbook exportInvoicesToXLSX(List<Invoice> invoices) {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Facturi");

        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Data Emisa", "Data Scadenta", "Suma", "Platita", "Nr. Factura", "Cod Client", "Rest de Plata", "Index Vechi", "Index Nou"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Fill data rows
        int rowNum = 1;

        for (Invoice invoice : invoices) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(invoice.getId());
            row.createCell(1).setCellValue(invoice.getCreated_date().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            row.createCell(2).setCellValue(invoice.getDue_date().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            row.createCell(3).setCellValue(invoice.getPrice());
            row.createCell(4).setCellValue(invoice.getPaid());
            row.createCell(5).setCellValue(invoice.getNrFactura());
            row.createCell(6).setCellValue(invoice.getCodClient());
            row.createCell(7).setCellValue(invoice.getRestDePlata());
            row.createCell(8).setCellValue(invoice.getIndexVechi());
            row.createCell(9).setCellValue(invoice.getIndexNou());

        }
        sheet.setColumnWidth(1, 200*15);
        sheet.setColumnWidth(2, 200*15);
        sheet.setColumnWidth(5, 200*15);
        sheet.setColumnWidth(6, 200*15);
        return workbook;
    }


    public XSSFWorkbook exportPaymentsToXLSX(List<Payment> payments) {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Plati");

        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Data", "Suma", "Cod Client", "Nume", "Nr. Factura", "Metoda de Plata"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Fill data rows
        int rowNum = 1;

        for (Payment payment : payments) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(payment.getId());
            row.createCell(1).setCellValue(payment.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
            row.createCell(2).setCellValue(payment.getAmount());
            row.createCell(3).setCellValue(payment.getCodClient());
            row.createCell(4).setCellValue(payment.getUserName());
            row.createCell(5).setCellValue(payment.getNrFactura());
            row.createCell(6).setCellValue(payment.getPaymentMethod());

        }
        sheet.setColumnWidth(1, 200*25);
        sheet.setColumnWidth(3, 200*15);
        sheet.setColumnWidth(5, 200*15);
        return workbook;
    }


}
