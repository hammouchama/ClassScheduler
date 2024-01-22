package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.Company;
import com.classscheduler.backend.service.CompanyService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.EscapedErrors;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/company")
@AllArgsConstructor
public class CompanyController {

    CompanyService companyService;

    //create new company
    @PostMapping("/add")
    public ResponseEntity<String> addCompany(@RequestBody Map<String,String > requestMap){
        try {
            return companyService.addCompany(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //get All companies
    @GetMapping("/get")
    public ResponseEntity<List<Company>> getAllCompany(){
        try {
            return companyService.getAllCompany();
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // get by id
    @GetMapping("/get/{id}")
    public ResponseEntity<Company> getCompany(@PathVariable long id){
        try {
            return companyService.getCompany(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //delete company
    @DeleteMapping("/delete/{id}")
    private ResponseEntity<String> deleteCompany(@PathVariable long id){
     try {

         return companyService.deleteCompany(id);

     }catch (Exception e){
         e.printStackTrace();
     }
     return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    //update company
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCompany(@PathVariable long id,@RequestBody Map<String ,String > requestMap){
        try {
            return companyService.updateCompany(id,requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
