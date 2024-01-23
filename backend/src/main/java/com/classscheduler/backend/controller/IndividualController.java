package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.service.IndividualService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/public/individual")
@AllArgsConstructor
public class IndividualController {

    IndividualService individualService;

    //register to a formation
    @PostMapping("/register/{id}")//id of formation
    public ResponseEntity<String> registerToFormation(@PathVariable long id, @RequestBody Map<String,String> requestMap){
        try {
            return individualService.register(id,requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
