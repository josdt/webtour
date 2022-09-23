package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "service")
@Data
public class Service {
    @Id
    private String idService;
    private String name;
}
