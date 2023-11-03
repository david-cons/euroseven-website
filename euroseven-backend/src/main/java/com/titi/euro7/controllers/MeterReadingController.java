package com.titi.euro7.controllers;


import com.titi.euro7.entities.MeterReading;
import com.titi.euro7.services.MeterReadingService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/meter-readings")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MeterReadingController {


    @Autowired
    private MeterReadingService meterReadingService;


    @PostMapping("/create")
    public ResponseEntity<MeterReading> createMeterReading(@RequestBody MeterReading meterReading) {
        return ResponseEntity.ok(meterReadingService.createMeterReading(meterReading));
    }

    @GetMapping()
    public ResponseEntity<List<MeterReading>> getAllMeterReadings() {
        return ResponseEntity.ok(meterReadingService.getAllMeterReadings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeterReading> getMeterReadingById(@PathVariable Long id) {
        return ResponseEntity.ok(meterReadingService.getMeterReadingById(id));
    }

    @GetMapping("/cod-client/{codClient}")
    public ResponseEntity<List<MeterReading>> getMeterReadingsByCodClient(@PathVariable int codClient) {
        return ResponseEntity.ok(meterReadingService.getAllMeterReadingsByCodClient(codClient));
    }

    @PostMapping("/accept/{id}/{codClient}")
    public ResponseEntity<Boolean> acceptMeterReading(@PathVariable Long id, @PathVariable int codClient) {
        return ResponseEntity.ok(meterReadingService.acceptMeterReading(id, codClient));
    }

    @PostMapping("/export")
    public ResponseEntity<ByteArrayResource> exportToXLSX(@RequestBody List<MeterReading> meterReadings) throws IOException  {
        XSSFWorkbook workbook = meterReadingService.exportReadingsToXLSX(meterReadings);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();

        bos.close();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=contoare.xlsx");
        headers.add("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new ByteArrayResource(bos.toByteArray()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MeterReading>> searchByCodClient(@RequestParam String keyword) {
        return ResponseEntity.ok(meterReadingService.searchByCodClient(keyword));
    }


}
