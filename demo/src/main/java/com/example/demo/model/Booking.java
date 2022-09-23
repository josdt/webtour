package com.example.demo.model;

import com.example.demo.model.composite.CustomerTourKey;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "booking")
@IdClass(CustomerTourKey.class)
public class Booking implements Serializable {

    @Id
    private String idTour;

    @Id
    private int idCustomer;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateBooking;
    private int quantityPeople;
    private float totalPrice;
    private String judge;


}