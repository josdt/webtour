package com.example.demo.model.repository;

import com.example.demo.model.Ask;
import com.example.demo.model.Booking;
import com.example.demo.model.Customer;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("SELECT c FROM Customer c WHERE c.phone = ?1 ")
    public Customer getCustomerByPhone(String phone);

    @Query("SELECT c FROM Customer c WHERE c.phone = ?1 AND c.password = ?2 ")
    public Customer checkLogin(String phone, String password);
}
