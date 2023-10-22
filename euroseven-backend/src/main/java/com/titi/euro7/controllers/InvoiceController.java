package com.titi.euro7.controllers;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.titi.euro7.dto.InvoiceDTO;
import com.titi.euro7.entities.Invoice;
import com.titi.euro7.entities.Payment;
import com.titi.euro7.services.InvoiceService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InvoiceController {


    @Autowired
    private InvoiceService invoiceService;

    private static final String BUCKET_NAME = "euro7";


    @JsonIgnore
    private final Storage storage;

    public InvoiceController() throws IOException {
        Resource resource = new ClassPathResource("neat-fin-401511-e125ce7ad47c.json");
        InputStream keyFileStream = resource.getInputStream();
        this.storage = StorageOptions.newBuilder()
                .setProjectId("neat-fin-401511")
                .setCredentials(ServiceAccountCredentials.fromStream(keyFileStream))
                .build()
                .getService();
    }



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
        try {
            // Decode the base64 string from the request to get the file bytes.
            byte[] pdfBytes = Base64.getDecoder().decode(invoice.getFile());



            int nrFactura = (int) UUID.randomUUID().getMostSignificantBits();
            if (nrFactura < 0) { nrFactura = nrFactura * (-1); }
            invoice.setNrFactura(nrFactura);
            String invoiceBucketName= "factura-" + invoice.getNrFactura();
            String urlInvoice = String.format("https://storage.googleapis.com/euro7/%s", invoiceBucketName);
            // Upload to Google Storage
            storage.create(BlobInfo.newBuilder(BUCKET_NAME, invoiceBucketName)
                    .setContentType("application/pdf")
                    .build(), pdfBytes);

            // Set the URL of the file in Google Storage to the invoice.
            invoice.setFile(urlInvoice);

            return ResponseEntity.ok(invoiceService.createInvoice(invoice));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/unpaid/count/{codClient}")
    public ResponseEntity<Integer> getCountUnpaidInvoices(@PathVariable Integer codClient) {
        return ResponseEntity.ok(invoiceService.getCountUnpaidInvoices(codClient));
    }

    @GetMapping("/payments/{codClient}")
    public ResponseEntity<List<Payment>> getAllPaymentsByCodClient(@PathVariable Integer codClient) {
        return ResponseEntity.ok(invoiceService.getAllPaymentsByCodClient(codClient));
    }

    @GetMapping("/codClient/{codClient}")
    public ResponseEntity<List<Invoice>> getAllInvoicesByCodClient(@PathVariable Integer codClient) {
        return ResponseEntity.ok(invoiceService.findAllByCodClient(codClient));
    }

    @PostMapping("/upload")
    public void uploadInvoices(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper pdfStripper = new PDFTextStripper();

            for (int page = 0; page < document.getNumberOfPages(); page++) {
                pdfStripper.setStartPage(page + 1);
                pdfStripper.setEndPage(page + 1);

                String text = pdfStripper.getText(document);

                text = text.replaceAll("\\s+", " ");
                //System.out.println(text);

                DateTimeFormatter displayFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

                LocalDate createdDate = LocalDate.parse(Objects.requireNonNull(extractValueAfterPattern(text, "Data emitere : ")), displayFormatter);
                double price = Double.parseDouble(Objects.requireNonNull(extractValueAfterPattern(text, "REST DE PLATA ")).replace(",",""));
                double restDePlata = Double.parseDouble(Objects.requireNonNull(extractValueAfterPattern(text, "Total de plata cu TVA ")).replace(",",""));
                Integer codClient = Integer.parseInt(Objects.requireNonNull(extractValueAfterPattern(text, "COD : ")));
                Invoice invoice = new Invoice();
                try {
                    Integer nrFactura = Integer.parseInt(Objects.requireNonNull(extractValueAfterPattern(text, "SB ")));
                    invoice.setNrFactura(nrFactura);

                } catch (NullPointerException e) {
                    Integer nrFactura = Integer.parseInt(Objects.requireNonNull(extractValueAfterPattern(text, "BD ")));
                    invoice.setNrFactura(nrFactura);
                }
                double indexNou = 0;
                double indexVechi = 0;
                try {
                    String extracted = text.substring(text.indexOf("Total de plata cu TVA") + "Total de plata cu TVA".length(),
                            text.indexOf("SERIE CONTOR")).trim();

                    extracted = extracted.replace(',', '.');

                    Pattern pattern = Pattern.compile("\\d+(\\.\\d+)?");
                    Matcher matcher = pattern.matcher(extracted);

                    List<Double> numbers = new ArrayList<>();
                    while (matcher.find()) {
                        numbers.add(Double.parseDouble(matcher.group()));
                    }

                    indexNou = numbers.get(numbers.size() - 2);
                    indexVechi = numbers.get(numbers.size() - 1);
                } catch (IndexOutOfBoundsException e) {
                    System.out.println("An error has occured");

                }

                invoice.setIndexNou(indexNou);
                invoice.setIndexVechi(indexVechi);
                invoice.setRestDePlata(restDePlata);
                invoice.setPaid(invoice.getRestDePlata() == 0);
                invoice.setCodClient(codClient);
                invoice.setCreated_date(createdDate);
                invoice.setPrice(price);
                invoice.setDue_date(createdDate.plusMonths(1));
                PDDocument pagePDF = new PDDocument();
                pagePDF.addPage(document.getPage(page));

                ByteArrayOutputStream pdfOutputStream = new ByteArrayOutputStream();
                pagePDF.save(pdfOutputStream);
                pagePDF.close();

                byte[] pdfBytes = pdfOutputStream.toByteArray();
                pdfOutputStream.close();

                String invoiceBucketName= "factura-"+invoice.getNrFactura();
                String urlInvoice = String.format("https://storage.googleapis.com/euro7/%s", invoiceBucketName);

                storage.create(BlobInfo.newBuilder(BUCKET_NAME, invoiceBucketName)
                                .setContentType("application/pdf")
                        .build(), pdfBytes);

                invoice.setFile(urlInvoice);
                System.out.print(invoice + "\n");
                //invoiceService.createInvoice(invoice);
            }
        }
    }


    @GetMapping("/download-file")
    public ResponseEntity<byte[]> downloadInvoice(@RequestParam String fileName) throws IOException {
        Blob blob = storage.get(BUCKET_NAME, fileName);

        if (blob == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] bytes = blob.getContent();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentLength(bytes.length);
        headers.setContentDispositionFormData("attachment", fileName);

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }


    private String extractValueAfterPattern(String text, String patternStr) {
        Pattern pattern = Pattern.compile(Pattern.quote(patternStr) + "(\\S+)");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find() && matcher.groupCount() >= 1) {
            return matcher.group(1).trim(); // Ensuring that we return a trimmed value
        }
        return null;
    }
}
