package com.titi.euro7.controllers;


import com.titi.euro7.dto.AddSaldoDTO;
import com.titi.euro7.dto.PasswordDTO;
import com.titi.euro7.entities.Notification;
import com.titi.euro7.entities.UpdateInformation;
import com.titi.euro7.entities.User;
import com.titi.euro7.services.NotificationService;
import com.titi.euro7.services.UserService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUser(@RequestParam String keyword) {
        return ResponseEntity.ok(userService.searchUser(keyword));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UpdateInformation updateInformation) {
        return ResponseEntity.ok(userService.updateUser(id, updateInformation.getName(), updateInformation.getAddress(), updateInformation.getJudet(), updateInformation.getLocalitate(), updateInformation.getPhone()));
    }

    @PostMapping("/toggle/{id}")
    public ResponseEntity<User> toggleUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.toggleUserStatus(id));
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<User> uploadImage(@RequestParam("picture")MultipartFile picture, @PathVariable Long id) {
        return ResponseEntity.ok(userService.uploadImage(picture, id));
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<String> getImage(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user != null && user.getImage() != null) {
            return ResponseEntity.ok(user.getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/coduriClienti")
    public ResponseEntity<List<Integer>> getCoduriClienti() {
        return ResponseEntity.ok(userService.getAllCodClient());
    }

    @GetMapping("/codClient/{codClient}")
    public ResponseEntity<User> getUserByCodClient(@PathVariable Integer codClient) {
        return ResponseEntity.ok(userService.getUserByCodClient(codClient));
    }

    @PostMapping("/{id}/add-rdp")
    public ResponseEntity<User> addSaldo(@PathVariable Long id, @RequestBody AddSaldoDTO addSaldoDTO) {
        return ResponseEntity.ok(userService.addRestDePlata(id, addSaldoDTO.getAmount()));
    }

    @PostMapping("/uploadExcel")
    public ResponseEntity<String> handleExcelFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File cannot be empty!");
        }

        try (InputStream is = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(is)) {

            Sheet sheet = workbook.getSheetAt(0);
            int rowNum = 0;

            for (Row currentRow : sheet) {

                if (rowNum == 0) {
                    rowNum++;
                    continue;
                }

                String user = getStringCellValue(currentRow.getCell(0));
                String username = getStringCellValue(currentRow.getCell(1));
                String name = getStringCellValue(currentRow.getCell(2));
                String contractNumber = getStringCellValue(currentRow.getCell(3));
                String phone = getStringCellValue(currentRow.getCell(4));
                String address = getStringCellValue(currentRow.getCell(5));

                Long id = Long.parseLong(user);
                Integer codClient = Integer.parseInt(contractNumber);
                name = formatName(name);
                if (phone.contains("+"))
                {
                    phone = "";
                } else if (phone.equals("730123456")) {
                    phone = "";
                } else if (isOnlyOnes(phone)) {
                    phone = "";
                } else if (phone.length() > 12) {
                    phone = "";
                }

                User newUser = new User(username, "test");
                newUser.setPassword(passwordEncoder.encode("test"));
                newUser.setId(id);
                newUser.setCodClient(codClient);
                newUser.setName(name);
                newUser.setPhone(phone);
                newUser.setJudet(formatName(address));
                newUser.setRole("ROLE_USER");
                newUser.setDefaultPassword(true);
                System.out.print(newUser + "\n");

//                if (newUser.getPhone().equals("") || newUser.getJudet().equals("") || newUser.getLocalitate().equals("") || newUser.getAddress().equals("")) {
//                    Notification notification = new Notification("Completează-ți profilul", newUser.getCodClient());
//                    notificationService.createNotification(notification);
//                }

                userService.createUser(newUser);
            }

            return ResponseEntity.ok("File processed successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error processing file!");
        }
    }

    private String getStringCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            default -> "";
        };
    }

    public String formatName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "";
        }

        String[] words = name.toLowerCase().split("\\s+");
        StringBuilder formattedName = new StringBuilder();

        for (String word : words) {
            if (word.length() > 0) {
                formattedName.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1)).append(" ");
            }
        }

        return formattedName.toString().trim();
    }

    public boolean isOnlyOnes(String s) {
        return s.chars().allMatch(ch -> ch == '1');
    }

    @PostMapping("/export")
    public ResponseEntity<ByteArrayResource> exportUsersToXLSX(@RequestBody List<User> users) throws IOException {
        XSSFWorkbook workbook = userService.exportUsersToXLSX(users);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=users.xlsx");
        headers.add("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new ByteArrayResource(bos.toByteArray()));
    }

    @PostMapping("/update-password/{id}")
    public ResponseEntity<User> updatePassword(@PathVariable Long id, @RequestBody PasswordDTO passwordDTO) {

        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));
        user.setDefaultPassword(false);
        return ResponseEntity.ok(userService.updateUserPassword(user));
    }

}

