package com.example.demo.model;

import com.example.demo.model.composite.PlaceTourKey;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "placetour")
@IdClass(PlaceTourKey.class)
public class PlaceTour implements Serializable {
    @Id
    private String idTour;

    @Id
    private String idPlace;
}
