package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.AssistantDTO;
import com.classscheduler.backend.service.AdminService;
import com.classscheduler.backend.service.UserService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private UserService userService;

    private AdminService adminService;

    @PostMapping("/addAssistant")
    public ResponseEntity<String> addAssistant(@RequestBody Map<String ,String> requestyMap){
        try {
            return userService.addAssistant(requestyMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getAllAssistant")
    public ResponseEntity<List<AssistantDTO>> getAllAssistant(){
        try{
            return adminService.getAllAssistant();
        }catch (Exception ex){
            ex.printStackTrace();
        }
     return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
