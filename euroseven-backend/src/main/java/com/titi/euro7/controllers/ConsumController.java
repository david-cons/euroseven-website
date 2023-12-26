package com.titi.euro7.controllers;


import com.titi.euro7.entities.Consum;
import com.titi.euro7.services.ConsumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/consum")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsumController {



    @Autowired
    private ConsumService consumService;


    @GetMapping("/{id}")
    public ResponseEntity<Consum> findById(Long id) {
        return ResponseEntity.ok(consumService.getConsumById(id));
    }

    @GetMapping("/find")
    public ResponseEntity<Consum> findByCodAndAddress(@RequestParam String cod, @RequestParam String address) {
        return ResponseEntity.ok(consumService.findConsumByCodAndAdresa(cod, address));
    }

    @PostMapping("/create")
    public ResponseEntity<Consum> createConsum(@RequestBody Consum consum) {
        return ResponseEntity.ok(consumService.createConsum(consum));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadConsum(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(consumService.uploadConsum(file));
    }

}
