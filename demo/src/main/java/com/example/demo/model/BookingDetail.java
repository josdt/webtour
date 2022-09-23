package com.example.demo.model;

import lombok.Data;

@Data
public class BookingDetail {
    private Booking booking;
    private Tour tour;
    private Customer customer;
}
