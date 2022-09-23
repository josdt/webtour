package com.example.demo.model.input;

import lombok.Data;

@Data
public class ChangePassInput {
    private String phone;
    private String password;
    private String newPass;
}
