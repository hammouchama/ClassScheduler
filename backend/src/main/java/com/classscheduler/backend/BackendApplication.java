package com.classscheduler.backend;


import com.classscheduler.backend.service.UserService;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200/*")
public class BackendApplication {

    UserService userService;

    public BackendApplication(UserService userService) {
        this.userService = userService;
        this.userService.addAdmin();
    }

    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);
    }

}
