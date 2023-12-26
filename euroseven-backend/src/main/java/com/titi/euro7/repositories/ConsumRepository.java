package com.titi.euro7.repositories;

import com.titi.euro7.entities.Consum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConsumRepository extends JpaRepository<Consum, Long> {

    Optional<Consum> findById(Long id);

    Optional<Consum> findByCod(String cod);
}
