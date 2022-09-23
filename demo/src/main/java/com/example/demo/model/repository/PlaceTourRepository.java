package com.example.demo.model.repository;

import com.example.demo.model.PlaceTour;
import com.example.demo.model.composite.CustomerTourKey;
import com.example.demo.model.composite.PlaceTourKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaceTourRepository extends JpaRepository<PlaceTour, PlaceTourKey> {

    @Query("SELECT p FROM PlaceTour p WHERE p.idTour = ?1 ")
    public List<PlaceTour> getPlaceTourByIdTour(String idTour);

    @Query("SELECT p FROM PlaceTour p WHERE p.idTour = ?1 AND p.idPlace= ?2 ")
    public PlaceTour getPlaceTourByIdTourAndIdPlace(String idTour, String idPlace);

//    @Modifying
//    @Query("DELETE FROM PlaceTour WHERE idTour=:idTour AND idPlace=:idPlace")
//    public int deletePlaceTourByIdTourAndIdPlace(String idTour, String idPlace);
}
