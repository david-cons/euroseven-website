package com.titi.euro7.repositories;

import com.titi.euro7.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findById(Long id);

    @Query("SELECT new com.titi.euro7.entities.Payment(p.amount, p.date, p.userName, p.nrFactura, p.paymentMethod) FROM Payment p WHERE p.codClient = ?1")
    List<Payment> findAllByCodClient(int codClient);
}
