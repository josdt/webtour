package com.example.demo.model.input;

import com.example.demo.model.PlaceTour;
import com.example.demo.model.ServiceTour;
import com.example.demo.model.Tour;
import com.example.demo.model.VehicleTour;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class TourCreateInput {
    private Tour tour;
    private List<String> idPlaceTours;
    private List<String> idVehicleTours;
    private List<String> idServiceTours;
}
