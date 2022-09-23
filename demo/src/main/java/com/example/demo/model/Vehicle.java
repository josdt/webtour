package com.example.demo.model;

import com.example.demo.model.travelEnum.VehicleType;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "vehicle")
@Data
public class Vehicle {
    @Id
    private String idVehicle;
    private String name;
    private String driverName;
    private VehicleType type;




}
