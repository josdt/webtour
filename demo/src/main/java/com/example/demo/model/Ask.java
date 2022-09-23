package com.example.demo.model;

import com.example.demo.model.composite.CustomerTourKey;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "ask")
@IdClass(CustomerTourKey.class)
public class Ask implements Serializable {

    @Id
    private String idTour;

    @Id
    private Integer idCustomer;

    private String question;
    private String answer;
}
