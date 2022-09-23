package com.example.demo.model;

import com.example.demo.model.composite.VehicleTourKey;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "vehicletour")
@IdClass(VehicleTourKey.class)
public class VehicleTour implements Serializable {

    @Id
    private String idTour;
    @Id
    private String idVehicle;

}
