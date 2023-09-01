package com.titi.euro7.repositories;

import com.titi.euro7.entities.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {

    Optional<PersonalDetails> findById(Long id);

    //TODO| add more methods here
}
