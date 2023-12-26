package com.titi.euro7.services;


import com.titi.euro7.entities.Consum;
import com.titi.euro7.entities.User;
import com.titi.euro7.repositories.ConsumRepository;
import com.titi.euro7.repositories.UserRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Objects;
import java.util.logging.Logger;

@Service
public class ConsumService {

    Logger log = Logger.getLogger(InvoiceService.class.getName());

    @Autowired
    private ConsumRepository consumRepository;

    @Autowired
    private UserRepository userRepository;

    public Consum getConsumById(Long id) {
        log.info("Retrieving consum with id " + id);
        return consumRepository.findById(id).orElse(null);
    }

//    public Consum getConsumByCod(String cod) {
//        log.info("Retrieving consum with cod " + cod);
//        return consumRepository.findByCod(cod).orElse(null);
//    }

    public Consum createConsum(Consum consum) {
        log.info("Saving consum " + consum.toString());
        return consumRepository.save(consum);
    }


    public Consum findConsumByCodAndAdresa(String cod, String address) {
        User user = userRepository.findByCodClient(Integer.valueOf(cod));
        if (user != null) {
            if (Objects.equals(address, user.getAddress())) {
                return consumRepository.findByCod(cod).orElse(null);
            }
        }
        return null;
    }


    public String uploadConsum(MultipartFile file) {
        if (file.isEmpty()) {
            return "File cannot be empty!";
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

                String cod = getStringCellValue(currentRow.getCell(0));
                String nrfactura = getStringCellValue(currentRow.getCell(1));
                String deplata = getStringCellValue(currentRow.getCell(2));
                String indexnou = getStringCellValue(currentRow.getCell(3));
                String indexvechi = getStringCellValue(currentRow.getCell(4));
                String consumT = getStringCellValue(currentRow.getCell(5));
                String perioada = getActualStringCellValue(currentRow.getCell(6));

                Consum consum = new Consum(cod, nrfactura, deplata, indexnou, indexvechi, consumT, perioada);
                System.out.print(consum + "\n");

                consumRepository.save(consum);
            }

            return "File processed successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing file!";
        }
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
    private String getStringCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            default -> "";
        };
    }


    private String getActualStringCellValue(Cell cell) {
        if (cell == null) return "";
        DataFormatter formatter = new DataFormatter();
        return formatter.formatCellValue(cell);
    }

}


