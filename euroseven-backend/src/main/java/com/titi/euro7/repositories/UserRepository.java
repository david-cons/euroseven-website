package com.titi.euro7.repositories;

import com.titi.euro7.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    List<User> findAllByRole(String role);


    //TODO| add more methods here
}
