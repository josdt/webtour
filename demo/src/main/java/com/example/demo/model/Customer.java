package com.example.demo.model;

import com.example.demo.model.travelEnum.ActiveStatus;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Id
    private int idCustomer;
    private String name;
    private String gender;
    private String email;
    private String phone;
    private String password;
    private ActiveStatus status;



}
