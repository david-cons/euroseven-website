package com.titi.euro7.services;


import com.titi.euro7.entities.MeterReading;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.MeterReadingRepository;
import com.titi.euro7.repositories.UserRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class MeterReadingService {


    Logger log = Logger.getLogger(MeterReadingService.class.getName());

    @Autowired
    private MeterReadingRepository meterReadingRepository;

    @Autowired
    private UserRepository userRepository;


    public MeterReading createMeterReading(MeterReading meterReading) {
        log.info("Created meter reading for codClient " + meterReading.getCodClient());
        meterReading.setAccepted(false);
        return meterReadingRepository.save(meterReading);
    }

    public List<MeterReading> getAllMeterReadings() {
        log.info("Getting all meter readings");
        return meterReadingRepository.findAll();
    }


    public List<MeterReading> getAllMeterReadingsByCodClient(int codClient) {
        log.info("Getting all meter readings with cod client " + codClient);
        return meterReadingRepository.findAllByCodClient(codClient);
    }


    public MeterReading getMeterReadingById(Long id) {
        log.info("Getting meter reading with id: " + id);
        return meterReadingRepository.findById(id).orElse(null);
    }

    public boolean acceptMeterReading(Long id, int codClient) {
        User user = userRepository.findByCodClient(codClient);
        MeterReading meterReading = meterReadingRepository.findById(id).orElse(null);
        if (meterReading == null) {
            log.info("Meter reading with id " + id + " does not exist");
            return false;
        }
        if (user == null) {
            log.info("User with codClient " + codClient + " does not exist");
            return false;
        }
        meterReading.setAccepted(true);
        user.setIndexVechi(meterReading.getIndexVechi());
        user.setIndexNou(meterReading.getIndexNou());
        meterReadingRepository.save(meterReading);
        return true;
    }

    public List<MeterReading> searchByCodClient(String keyword) {
        log.info("Searching for meter-readings with keyword: " + keyword);
        List<MeterReading> meterReadings = meterReadingRepository.findAll();
        List<MeterReading> searchResult = new ArrayList<>();
        for (MeterReading meterReading : meterReadings) {
            int codClient = meterReading.getCodClient();
            if (Integer.toString(codClient).startsWith(keyword)) {
                searchResult.add(meterReading);
            }
        }
        return searchResult;
    }

    public XSSFWorkbook exportReadingsToXLSX(List<MeterReading> meterReadings) {
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Contoare");
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Serie Contor", "Index Vechi", "Index Nou", "Cod Client", "Data", "Acceptata"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        int rowNum = 1;
        for (MeterReading reading: meterReadings) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(reading.getId());
            row.createCell(1).setCellValue(reading.getSerieContor());
            row.createCell(2).setCellValue(reading.getIndexVechi());
            row.createCell(3).setCellValue(reading.getIndexNou());
            row.createCell(4).setCellValue(reading.getCodClient());
            row.createCell(5).setCellValue(reading.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            row.createCell(6).setCellValue(reading.getAccepted());
        }

        sheet.setColumnWidth(1, 200*10);
        sheet.setColumnWidth(2, 200*10);
        sheet.setColumnWidth(3, 200*10);
        sheet.setColumnWidth(4, 200*15);
        sheet.setColumnWidth(5, 200*15);

        return workbook;
    }


}
