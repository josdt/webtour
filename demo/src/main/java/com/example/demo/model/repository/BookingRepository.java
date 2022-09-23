package com.example.demo.model.repository;

import com.example.demo.model.Ask;
import com.example.demo.model.Booking;
import com.example.demo.model.composite.CustomerTourKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, CustomerTourKey> {

    @Query("SELECT b FROM Booking b WHERE b.idTour = ?1 ")
    public List<Booking> getBookingByIdTour(String idTour);

    @Query("SELECT b FROM Booking b WHERE b.idCustomer = ?1 ")
    public List<Booking> getBookingByIdCustomer(int idCustomer);

    @Query("SELECT b FROM Booking b WHERE b.idTour = ?1 AND b.idCustomer = ?2 ")
    public Booking getBookingByIdTourAndIdCustomer(String idTour, int idCustomer);
//
//    @Query("DELETE FROM Booking  WHERE idTour = ?1 AND idCustomer= ?2 ")
//    public void deleteByIdTourAndIdCustomer(String idTour, int idCustomer);
}

