package com.example.demo.storage;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
    public void init();
    public String save(MultipartFile file);
    public Stream<Path> loadAll();
    public Resource load(String filename);
    public void deleteAll();
}
