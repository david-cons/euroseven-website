package com.titi.euro7.repositories;

import com.titi.euro7.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    List<User> findAllByRole(String role);

    User findByCodClient(Integer codClient);

    @Query("SELECT u.codClient FROM User u WHERE u.role = 'ROLE_USER'")
    List<Integer> findAllCodClient();


    //TODO| add more methods here
}
