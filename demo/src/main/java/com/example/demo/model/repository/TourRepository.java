package com.example.demo.model.repository;

import com.example.demo.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, String> {

    @Query("SELECT t FROM Tour t WHERE t.title LIKE %?1% ")
    public List<Tour> searchTour(String key);

    @Query("SELECT t FROM Tour t WHERE t.title LIKE %?1% OR t.dateStart = ?2 OR t.dateEnd = ?3")
    public List<Tour> filterTour(String key, Date dateStart, Date dateEnd);

    @Query("SELECT t FROM Tour t WHERE t.idEmployee = ?1 ")
    public List<Tour> getTourByIdEmployee(String idEmployee);
}