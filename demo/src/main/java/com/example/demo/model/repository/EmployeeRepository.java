package com.example.demo.model.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query("SELECT e FROM Employee e WHERE e.phone = ?1 ")
    public Employee getEmployeeByPhone(String phone);

    @Query("SELECT e FROM Employee e WHERE e.phone = ?1 AND e.password = ?2 ")
    public Employee checkLogin(String phone, String password);
}
