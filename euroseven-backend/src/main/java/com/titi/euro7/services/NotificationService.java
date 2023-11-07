package com.titi.euro7.services;


import com.titi.euro7.entities.Notification;
import com.titi.euro7.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class NotificationService {

    Logger log = Logger.getLogger(NotificationService.class.getName());

    @Autowired
    private NotificationRepository notificationRepository;

    public boolean markNotificationAsCompleted(Long id) {
        log.info("Marking notification with id " + id + " as completed");
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification == null) {
            log.info("Notification with id " + id + " does not exist");
            return false;
        }
        notification.setCompleted(true);
        notificationRepository.save(notification);
        return true;
    }

    public List<Notification> getAllUncompleted(int codClient) {
        return notificationRepository.findUncompletedByCodClient(codClient);
    }

    public Notification createNotification(Notification notification) {
        log.info("Creating notification for codClient " + notification.getCodClient());
        notification.setCompleted(false);
        return notificationRepository.save(notification);
    }


}
