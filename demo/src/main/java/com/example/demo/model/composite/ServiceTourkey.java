package com.example.demo.model.composite;

import lombok.Data;

import java.io.Serializable;

@Data
public class ServiceTourkey implements Serializable {
    private String idTour;

    private String idService;
}
