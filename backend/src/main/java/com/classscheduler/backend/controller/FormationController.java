package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.service.FormationService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/formation")
@AllArgsConstructor
public class FormationController {

    private FormationService formationService;

    //add formation
    @PostMapping("/add")
    public ResponseEntity<String> addFormation(@RequestBody Map<String ,String> requestyMap){
        try{
            return formationService.addFormation(requestyMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get All formation Active for admin
    @GetMapping("/get")
    public ResponseEntity<List<Formation>> getAllFormation(){
        try {
            return formationService.getAllFormation();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get formation by id
    @GetMapping("/get/{id}")
     public ResponseEntity<Object> getFormation(@PathVariable  long id){
        try{
           return formationService.getFormation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
     }

    // remove formation by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String > deleteFormation(@PathVariable long id){
        try {
          return formationService.deleteFormation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //update formation
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateFormation(@PathVariable long id,@RequestBody Map<String,String> requestMap){
        try {
            return formationService.updateFormation(id,requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
