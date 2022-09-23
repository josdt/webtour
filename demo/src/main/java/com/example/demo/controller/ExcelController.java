package com.example.demo.controller;

import com.example.demo.excel.CustomerExcelExporter;
import com.example.demo.excel.EmployeeExcelExporter;
import com.example.demo.model.Customer;
import com.example.demo.model.Employee;
import com.example.demo.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class ExcelController {

    @Autowired
    private TravelService travelService;

    @PostMapping("/export/employee")
    public void exportEmployeeToExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=employees_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Employee> listEmployees = travelService.getAllEmployee();

        EmployeeExcelExporter excelExporter = new EmployeeExcelExporter(listEmployees);

        excelExporter.export(response);
    }

    @PostMapping("/export/customer")
    public void exportCustomerToExcel(HttpServletResponse response) throws IOException{
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=customers_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Customer> listCustomers = travelService.getAllCustomer();

        CustomerExcelExporter excelExporter = new CustomerExcelExporter(listCustomers);

        excelExporter.export(response);
    }

    @PostMapping("/export/customertour/{idTour}")
    public void exportCustomerToExcel(@PathVariable(name = "idTour") String idTour, HttpServletResponse response) throws IOException{
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=customertour_"+idTour+"_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Customer> listCustomers = travelService.getListCustomerByIdTour(idTour);

        CustomerExcelExporter excelExporter = new CustomerExcelExporter(listCustomers);

        excelExporter.export(response);
    }
}
