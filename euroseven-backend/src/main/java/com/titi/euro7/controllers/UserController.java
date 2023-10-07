package com.titi.euro7.controllers;


import com.titi.euro7.dto.AddSaldoDTO;
import com.titi.euro7.entities.UpdateInformation;
import com.titi.euro7.entities.User;
import com.titi.euro7.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

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

    @PostMapping("/{id}/add-saldo")
    public ResponseEntity<User> addSaldo(@PathVariable Long id, @RequestBody AddSaldoDTO addSaldoDTO) {
        return ResponseEntity.ok(userService.addToSaldo(id, addSaldoDTO.getAmount()));
    }
}
