package com.example.demo.model.input;

import lombok.Data;

@Data
public class EmployeeUpdateInput {
    private String idEmployee;
    private String name;
    private String address;
    private String email;
}
