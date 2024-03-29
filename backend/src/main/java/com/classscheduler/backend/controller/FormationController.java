package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.FormationDTOAdmin;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.service.FormationService;
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
public class FormationController {

    private FormationService formationService;

    //add formation
    @PostMapping("/formation/add")
    public ResponseEntity<String> addFormation(@RequestPart("image") MultipartFile image ,@RequestPart("data") Map<String ,String> requestyMap){
        try{
           return formationService.addFormation(requestyMap,image);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get All formation Active for admin
    @GetMapping("/formation/get")
    public ResponseEntity<List<FormationDTOAdmin>> getAllFormation(){
        try {
            return formationService.getAllFormation();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get formation by id
    @GetMapping("/formation/get/{id}")
     public ResponseEntity<FormationDTOAdmin> getFormation(@PathVariable  long id){
        try{
           return formationService.getFormation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
     }

    // remove formation by id
    @DeleteMapping("/formation/delete/{id}")
    public ResponseEntity<String > deleteFormation(@PathVariable long id){
        try {
          return formationService.deleteFormation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //update formation
    @PutMapping("/formation/update/{id}")
    public ResponseEntity<String> updateFormation(@PathVariable long id,@RequestPart("data") Map<String,String> requestMap,
                                                  @RequestPart(value = "image", required = false) MultipartFile image ){
        try {
            return formationService.updateFormation(id,requestMap,image);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get All formation public
    @GetMapping("/public/formation/get")
    public ResponseEntity<List<FormationDTO>> getAllPublicFormation(){
        try {
            return formationService.getAllPublicFormation();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //get formation public by id
    @GetMapping("/public/formation/get/{id}")
    public ResponseEntity<FormationDTO> getPublicFormation(@PathVariable long id){
        try {
            return formationService.getPublicFormation(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // get formation by slug
    @GetMapping("/public/formation/getBySlug/{slug}")
    public ResponseEntity<FormationDTO> getFormationBySlug(@PathVariable String slug){
        try {
            return formationService.getFormationBySlug(slug);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null ,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/formation/endFormationAndGenerateTokens/{formationId}/{trainerId}")
    public ResponseEntity<String> endFormationAndGenerateTokens(@PathVariable long formationId, @PathVariable long trainerId) {
        try {
            return formationService.endFormationAndGenerateTokens(formationId, trainerId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //get formation by City
    @GetMapping("/formation/get/city")
    public ResponseEntity<List<FormationDTOAdmin>> getAllByCityFormation(){
        try {
            return formationService.getAllByCityFormation();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
