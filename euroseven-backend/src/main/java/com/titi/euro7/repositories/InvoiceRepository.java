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

    @Query("SELECT new com.titi.euro7.dto.InvoiceDTO(i.nrFactura, i.restDePlata, i.created_date) FROM Invoice i WHERE i.codClient = ?1 AND i.paid = false AND i.restDePlata != 0")
    List<InvoiceDTO> findAllNrFacturaByCodClient(Integer codClient);

    @Query("SELECT new com.titi.euro7.entities.Invoice(i.id, i.created_date, i.due_date, i.price, i.file, i.paid, i.nrFactura, i.codClient, i.restDePlata, i.indexVechi, i.indexNou) FROM Invoice i WHERE i.codClient = ?1 AND i.paid = false")
    List<Invoice> findAllUnpaidInvoicesByCodClient(Integer codClient);

    //TODO| add more methods here
}
