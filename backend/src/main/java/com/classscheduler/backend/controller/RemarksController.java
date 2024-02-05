package com.classscheduler.backend.controller;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.RemarksTokenValidationDTO;
import com.classscheduler.backend.model.Company;
import com.classscheduler.backend.model.Remarks;
import com.classscheduler.backend.service.CompanyService;
import com.classscheduler.backend.service.RemarksService;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class RemarksController {

    RemarksService remarksService;

    @GetMapping("/remarks/all")
    public ResponseEntity<List<Remarks>> getAllRemarks() {
        List<Remarks> remarksList = remarksService.getAllRemarks();
        return new ResponseEntity<>(remarksList, HttpStatus.OK);
    }

    @GetMapping("/remarks/{id}")
    public ResponseEntity<Remarks> getRemarksById(@PathVariable Long id) {
        Remarks remarks = remarksService.getRemarksById(id);
        if (remarks != null) {
            return new ResponseEntity<>(remarks, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/remarks/add")
    public ResponseEntity<String> addRemarks(@RequestBody Map<String,String > requestMap) {
        try {
            return remarksService.addRemarks(requestMap);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }



    @PutMapping("/public/remarks/submit")
    public ResponseEntity<String> submitRemarks(@RequestBody Map<String ,String> requestMap) {
        System.out.println("requestMap1");
        System.out.println(requestMap);
        try {
            return remarksService.addRemarks(requestMap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/remarks/delete/{id}")
    public ResponseEntity<String> deleteRemarks(@PathVariable Long id) {
        try {

            return remarksService.deleteRemarks(id);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/public/remarks/verifyToken/{token}")
    public ResponseEntity<RemarksTokenValidationDTO> validateRemarksToken(@PathVariable String token) {
        try {
            return remarksService.validateRemarksToken(token);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
