package com.titi.euro7.repositories;

import com.titi.euro7.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findById(Long id);

    //TODO| add more methods here
}
