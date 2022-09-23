package com.example.demo.model.input;

import lombok.Data;

@Data
public class EmployeeCreateInput {
    private String idEmployee;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String password;
    private String role;
}
