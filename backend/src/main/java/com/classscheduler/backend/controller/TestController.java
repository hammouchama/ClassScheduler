package com.classscheduler.backend.controller;

import com.classscheduler.backend.utils.Helpers;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class TestController {

    @PostMapping("/upload")
    public String selectimage(@RequestParam("photo") MultipartFile file) throws IOException {
       return "http://localhost:8080/images/formation/"+Helpers.saveImage(file,true);
    }
}
