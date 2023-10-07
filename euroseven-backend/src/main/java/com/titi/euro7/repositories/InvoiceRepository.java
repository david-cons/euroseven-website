package com.titi.euro7.repositories;

import com.titi.euro7.dto.InvoiceDTO;
import com.titi.euro7.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findById(Long id);

    List<Invoice> findInvoicesByPaidIsTrue();

    List<Invoice> findInvoicesByPaidIsFalse();

    Invoice findByNrFactura(Integer nrFactura);

    @Query("SELECT new com.titi.euro7.dto.InvoiceDTO(i.nrFactura, i.restDePlata) FROM Invoice i WHERE i.codClient = ?1 AND i.paid = false AND i.restDePlata != 0")
    List<InvoiceDTO> findAllNrFacturaByCodClient(Integer codClient);

    //TODO| add more methods here
}
