package com.example.demo.model;

import com.example.demo.model.composite.ServiceTourkey;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "servicetour")
@IdClass(ServiceTourkey.class)
public class ServiceTour implements Serializable {
    @Id
    private String idTour;

    @Id
    private String idService;
}
