package com.example.demo.model.repository;

import com.example.demo.model.Ask;
import com.example.demo.model.composite.CustomerTourKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AskRepository extends JpaRepository<Ask, CustomerTourKey> {

    @Query("SELECT a FROM Ask a WHERE a.idTour = ?1 ")
    public List<Ask> getAskByIdTour(String idTour);

    @Query("SELECT a FROM Ask a WHERE a.idTour = ?1 AND a.idCustomer = ?2 ")
    public Ask getAskByIdTourAndIdCustomer(String idTour, Integer idCustomer);


    @Query("DELETE FROM Ask a WHERE a.idTour = ?1 AND a.idCustomer= ?2 ")
    public void deleteByIdTourAndIdCustomer(String idTour, Integer idCustomer);
}
