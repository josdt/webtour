package com.example.demo.excel;

import com.example.demo.model.Customer;
import com.example.demo.model.Tour;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class TourExcelExporter {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<Tour> listTours;

    public TourExcelExporter(List<Tour> listTours) {
        this.listTours = listTours;
        workbook = new XSSFWorkbook();
    }


    private void writeHeaderLine() {
        sheet = workbook.createSheet("Tours");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "IdTour", style);
        createCell(row, 1, "Title", style);
        createCell(row, 2, "IdEmployee", style);
        createCell(row, 3, "DateStart", style);
        createCell(row, 4, "DateEnd", style);
        createCell(row, 5, "Price", style);
        createCell(row, 6, "Description", style);
        createCell(row, 7, "Type", style);
    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (Tour tour : listTours) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, tour.getIdTour(), style);
            createCell(row, columnCount++, tour.getTitle(), style);
            createCell(row, columnCount++, tour.getIdEmployee(), style);
            createCell(row, columnCount++, tour.getDateStart(), style);
            createCell(row, columnCount++, tour.getDateEnd(), style);
            createCell(row, columnCount++, tour.getPrice(), style);
            createCell(row, columnCount++, tour.getDescription(), style);
            createCell(row, columnCount++, tour.getType(), style);
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();

    }
}
