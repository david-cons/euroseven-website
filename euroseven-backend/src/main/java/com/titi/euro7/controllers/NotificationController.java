package com.titi.euro7.controllers;


import com.titi.euro7.entities.Notification;
import com.titi.euro7.services.NotificationService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/complete/{id}")
    public ResponseEntity<Boolean> markNotificationAsCompleted(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markNotificationAsCompleted(id));
    }

    @GetMapping("/{codClient}")
    public ResponseEntity<List<Notification>> getAllUncompletedByCodClient(@PathVariable int codClient) {
        return ResponseEntity.ok(notificationService.getAllUncompleted(codClient));
    }

    @PostMapping("/create")
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }
}
