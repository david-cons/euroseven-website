package com.titi.euro7.repositories;

import com.titi.euro7.entities.MeterReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {

    Optional<MeterReading> findById(Long id);


    @Query("SELECT NEW com.titi.euro7.entities.MeterReading(m.id, m.indexVechi, m.indexNou, m.codClient, m.date, m.picture) FROM MeterReading m WHERE m.codClient = ?1")
    List<MeterReading> findAllByCodClient(int codClient);
}
