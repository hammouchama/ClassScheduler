package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.Scheduling;
import com.classscheduler.backend.service.SchedulingService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scheduling")
@AllArgsConstructor
public class SchedulingController {
    SchedulingService schedulingService;

    @PostMapping("/add")
    public ResponseEntity<String> addScheduling(@RequestBody Map<String ,String >requestMap){
        try {
            return schedulingService.addScheduling(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/get")
    public ResponseEntity<List<Scheduling>> getAllScheduling(){
        try {
            return schedulingService.getAllSchadeuling();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }@GetMapping("/get/trainer/{id}")
    public ResponseEntity<List<Scheduling>> getAllByTrainerId(@PathVariable long id){
        try {
            return schedulingService.getAllByTrainerId(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /// delete Scheduling
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteScheduling(@PathVariable long id){
        try {
            return schedulingService.deleteScheduling(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //update Scheduling
    @PutMapping("/update/{id}")
    public ResponseEntity<String > updateScheduling(@PathVariable long id,@RequestBody Map<String ,String >requestMap){
        try {
            return schedulingService.upadateScheduling(id,requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
