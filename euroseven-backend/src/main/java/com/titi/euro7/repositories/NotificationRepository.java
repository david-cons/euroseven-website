package com.titi.euro7.repositories;


import com.titi.euro7.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<Notification> findById(Long id);
    @Query("SELECT new com.titi.euro7.entities.Notification(n.id, n.content, n.codClient, n.completed) FROM Notification n WHERE n.codClient = ?1 AND n.completed = false")
    List<Notification> findUncompletedByCodClient(int codClient);

}
