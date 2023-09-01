package com.titi.euro7.repositories;

import com.titi.euro7.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    //TODO| add more methods here
}
