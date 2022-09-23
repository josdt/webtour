package com.example.demo.model.input;

import lombok.Data;

import java.util.Date;
@Data
public class FilterInput {
    private String title;
    private Date dateStart;
    private Date dateEnd;
}
