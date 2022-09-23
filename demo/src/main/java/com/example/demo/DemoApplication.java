package com.example.demo;

import com.example.demo.controller.TravelController;
import com.example.demo.model.Place;
import com.example.demo.model.PlaceTour;
import com.example.demo.service.TravelService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
	}

}
