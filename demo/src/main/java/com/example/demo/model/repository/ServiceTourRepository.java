package com.example.demo.model.repository;

import com.example.demo.model.ServiceTour;
import com.example.demo.model.VehicleTour;
import com.example.demo.model.composite.ServiceTourkey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceTourRepository extends JpaRepository<ServiceTour, ServiceTourkey> {
    @Query("SELECT st FROM ServiceTour st WHERE st.idTour = ?1 ")
    public List<ServiceTour> getServiceTourByIdTour(String idTour);

//    @Query("SELECT st FROM ServiceTour st WHERE st.idTour = ?1 AND st.idService= ?2 ")
//    public ServiceTour getServiceTourByIdTourAndIdService(String idTour, String idService);
//
//    @Query("DELETE FROM ServiceTour st WHERE st.idTour = ?1 AND st.idService= ?2 ")
//    public void deleteServiceTourByIdTourAndIdService(String idTour, String idService);
}
