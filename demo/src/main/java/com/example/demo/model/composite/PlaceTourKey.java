package com.example.demo.model.composite;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
public class PlaceTourKey implements Serializable {
    private String idTour;

    private String idPlace;
}
