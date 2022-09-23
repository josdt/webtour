package com.example.demo.model;

import lombok.Data;

import java.util.List;

@Data
public class TourDetail {
    private Tour tour;
    private List<Place> places;
    private List<Vehicle> vehicles;
    private List<Service> services;
    private List<Booking> bookings;
    private List<Ask> asks;
}
