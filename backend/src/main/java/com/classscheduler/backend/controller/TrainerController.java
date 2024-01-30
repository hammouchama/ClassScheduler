package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.TrainerDTO;
import com.classscheduler.backend.model.Trainer;
import com.classscheduler.backend.service.TrainerService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class TrainerController {

   TrainerService trainerService;

    //register new trainer
    @PostMapping("/public/trainer/register")
    public ResponseEntity<String> registerTrainer(@RequestPart("image")
                                                      MultipartFile image,
                                                  @RequestPart("data") Map<String,String> requestMap){
        System.out.println("hi");
        try {
          return  trainerService.registerTrainer(requestMap,image);
        }catch (Exception e){
            e.printStackTrace();
            return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //get all trainers not accepted yet
    //this end point return the trainers who are applied to make formation an is not accepted yet
    @GetMapping("/trainer/get")
    public ResponseEntity<List<TrainerDTO>> getTrainers(){
      try {
          return trainerService.getTrainersNotAccepted();
      }catch (Exception e){
          e.printStackTrace();
      }
      return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //get all accepted trainer

    //get trainer by id
    @GetMapping("/get/{id}")
    public ResponseEntity<TrainerDTO> getTrainer(@PathVariable long id){
        try {
            return trainerService.getTrainerById(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //accept trainer
    @GetMapping("/accept/{id}")
    public ResponseEntity<String> acceptTrainer(@PathVariable long id){
        try {
            return trainerService.acceptTrainer(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //update trainer
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTrainerInfo(@PathVariable long id,@RequestBody Map<String ,String> requestMap){
        try {
            return trainerService.updateTrainer(id,requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //delete trainer
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTrainer(@PathVariable long id){
        try {
             return trainerService.deleteTrainer(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
