package com.example.demo.model.input;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.File;

@Data
public class PlaceCreateInput {
    private String idPlace;
    private String name;
    private String image;
}
