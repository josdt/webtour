package com.example.demo.model.input;


import com.example.demo.model.travelEnum.VehicleType;
import lombok.Data;

@Data
public class VehicleCreateInput {
    private String idVehicle;
    private String name;
    private String driverName;
    private VehicleType type;
}
