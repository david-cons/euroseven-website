package com.titi.euro7.services;


import com.titi.euro7.entities.Notification;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.NotificationRepository;
import com.titi.euro7.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {

    Logger log = Logger.getLogger(UserService.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public User getUserById(Long id) {
        log.info("Retrieving user with id " + id);
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        log.info("Getting all users");
        return userRepository.findAllByRole("ROLE_USER");
    }

    public User createUser(User user) {
        log.info("Saving user " + user.toString());
        user.setRestDePlataTotal(0.0);
        return userRepository.save(user);
    }

    public User updateUserPassword(User user) {
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) {
        log.info("Deleting user with id " + id);
        if (!userRepository.existsById(id)) {
            log.info("User with id " + id + " does not exist");
            return false;
        }
        userRepository.deleteById(id);
        return true;
    }

    public List<User> searchUser(String keyword) {
        log.info("Searching for user with keyword " + keyword);
        List<User> users = userRepository.findAllByRole("ROLE_USER");
        List<User> searchResult = new ArrayList<>();

        if (isNumeric(keyword)) {
            for (User user : users) {
                Integer codClient = user.getCodClient();
                if (codClient != null && codClient.toString().startsWith(keyword)) {
                    searchResult.add(user);
                }
            }
        } else {
            for (User user : users) {
                String name = user.getName();
                if (name != null && name.startsWith(keyword)) {
                    searchResult.add(user);
                }
            }
        }

        return searchResult;
    }


    @Transactional
    public User updateUser(Long id, String name, String address, String judet, String localitate, String phone) {
        log.info("Updating user with id " + id);
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        user.setName(name);
        user.setAddress(address);
        user.setJudet(judet);
        user.setLocalitate(localitate);
        user.setPhone(phone);
        if (!name.isEmpty() && !address.isEmpty() && !judet.isEmpty() && !localitate.isEmpty() && !phone.isEmpty()) {
            List<Notification> userNotifications = notificationRepository.findUncompletedByCodClient(user.getCodClient());
            for (Notification notification : userNotifications) {
                if (notification.getContent().equals("Completează-ți profilul") || notification.getContent().equals("Completeza-ti profilul.")) {

                    notification.setCompleted(true);
                    notificationRepository.save(notification);
                }
            }
        }
        return userRepository.save(user);

    }

    public static boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");
    }


    public User toggleUserStatus(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        if (!user.getInactive()) {
            user.setInactive(true);
            log.info("User with id " + id + " is now inactive");
        } else {
            user.setInactive(false);
            log.info("User with id " + id + " is now active");
        }
        userRepository.save(user);
        return user;
    }

    public User uploadImage(MultipartFile picture, Long id) {

        try {
            if (picture.isEmpty()) {
                log.info("File is empty");
                return null;
            }

            String contentType = picture.getContentType();
            long size = picture.getSize();

            // Check if the file is an image and size is less than or equal to 1MB
            if ((contentType != null && !contentType.startsWith("image")) || size > 1048576) {
                log.info("Invalid file type or size");
                return null;
            }

            User user = userRepository.findById(id).orElse(null);
            if (user == null) {
                log.info("User with id " + id + " does not exist");
                return null;
            }
            user.setImage(Base64.getEncoder().encodeToString(picture.getBytes()));
            userRepository.save(user);
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }


    public List<Integer> getAllCodClient() {
        log.info("Getting all codClient");
        return userRepository.findAllCodClient();
    }

    public User getUserByCodClient(Integer codClient) {
        log.info("Getting user by codClient");
        return userRepository.findByCodClient(codClient);
    }

    public User addRestDePlata(Long id, double amount) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        user.setRestDePlataTotal(user.getRestDePlataTotal() - amount);
        return userRepository.save(user);
    }

    public XSSFWorkbook exportUsersToXLSX(List<User> users) {

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Clienti");

        // Header Row
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Username", "Parola", "Inactiv", "Rol", "Nume", "Cod Client", "Adresa", "Judet", "Localitate", "Telefon", "De Plata Total"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Fill data rows
        int rowNum = 1;
        for (User user : users) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(user.getId());
            row.createCell(1).setCellValue(user.getUsername());
            row.createCell(2).setCellValue(user.getPassword());
            row.createCell(3).setCellValue(user.getInactive());
            row.createCell(4).setCellValue(user.getRole());
            row.createCell(5).setCellValue(user.getName());
            row.createCell(6).setCellValue(user.getCodClient());
            row.createCell(7).setCellValue(user.getAddress());
            row.createCell(8).setCellValue(user.getJudet());
            row.createCell(9).setCellValue(user.getLocalitate());
            row.createCell(10).setCellValue(user.getPhone());
            row.createCell(11).setCellValue(user.getRestDePlataTotal());
        }

        sheet.setColumnWidth(1, 200 * 50);
        sheet.setColumnWidth(4, 200 * 25);
        sheet.setColumnWidth(5, 200 * 25);
        sheet.setColumnWidth(7, 200 * 25);
        sheet.setColumnWidth(8, 200 * 25);
        sheet.setColumnWidth(9, 200 * 25);
        sheet.setColumnWidth(10, 200 * 25);
        sheet.setColumnWidth(11, 200 * 25);
        return workbook;
    }


    public User updatePassword(Long id, String password, String confirmPassword) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            log.info("User with id " + id + " does not exist");
            return null;
        }
        if (!password.equals(confirmPassword)) {
            log.info("Passwords do not match");
            return null;
        }
        user.setPassword(password);
        user.setDefaultPassword(false);
        return userRepository.save(user);
    }
}




