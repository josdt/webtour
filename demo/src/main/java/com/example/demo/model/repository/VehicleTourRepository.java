package com.example.demo.model.repository;

import com.example.demo.model.Ask;
import com.example.demo.model.ServiceTour;
import com.example.demo.model.VehicleTour;
import com.example.demo.model.composite.VehicleTourKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehicleTourRepository extends JpaRepository<VehicleTour, VehicleTourKey> {

    @Query("SELECT v FROM VehicleTour v WHERE v.idTour = ?1 ")
    public List<VehicleTour> getVehicleTourByIdTour(String idTour);

//    @Query("SELECT v FROM VehicleTour v WHERE v.idTour = ?1 AND v.idVehicle= ?2 ")
//    public VehicleTour getVehicleTourByIdTourAndIdVehicle(String idTour, String idVehicle);
//
//    @Query("DELETE FROM VehicleTour v WHERE v.idTour = ?1 AND v.idVehicle= ?2 ")
//    public void deleteVehicleTourByIdTourAndIdVehicle(String idTour, String idVehicle);
}
