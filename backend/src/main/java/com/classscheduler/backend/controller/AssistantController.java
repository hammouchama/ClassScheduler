package com.classscheduler.backend.controller;

import com.classscheduler.backend.service.AssistantService;
import com.classscheduler.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/assistant")
public class AssistantController {
    AssistantService assistantService;
    UserService userService;


}
