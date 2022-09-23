package com.example.demo.model.input;

import lombok.Data;

import java.util.Date;

@Data
public class BookingCreateInput {
    private String idCustomer;
    private String idTour;
    private String quantityPeople;
}
