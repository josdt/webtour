package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "place")
@Data
public class Place {
    @Id
    private String idPlace;
    private String name;
    private String image;





}