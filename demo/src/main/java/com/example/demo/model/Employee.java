package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "employee")
@Data
public class Employee {
    @Id
    private String idEmployee;
    private String name;
    private String address;
    private String email;
    private String phone;
    private String password;
    private String role;


}

