package com.classscheduler.backend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Helpers {
    public Helpers() {
    }

    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus){

        return new ResponseEntity<>("{\"message\":\""+responseMessage+"\"}",httpStatus);
    }
}
