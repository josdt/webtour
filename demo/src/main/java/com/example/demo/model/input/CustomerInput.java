package com.example.demo.model.input;

import com.example.demo.model.travelEnum.ActiveStatus;
import lombok.Data;

@Data
public class CustomerInput {
    private String name;
    private String gender;
    private String email;
    private String phone;
    private String password;
}
