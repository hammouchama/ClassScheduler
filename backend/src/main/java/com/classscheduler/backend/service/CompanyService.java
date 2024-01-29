package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.Company;
import com.classscheduler.backend.repository.CompanyRepository;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class CompanyService {

    CompanyRepository companyRepository;
    JwtFilter jwtFilter;

    @Transactional
    public ResponseEntity<String> addCompany(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                if(isValidCompanyInfo(requestMap)){
                    Company company=new Company();
                    companyRepository.save(extractCompanyInfo(requestMap,company));
                    return  Helpers.getResponseEntity("Company has been added successfully",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean isValidCompanyInfo(Map<String, String> requestMap) {
        if(
                requestMap.containsKey("name")
                && requestMap.containsKey("phone")
                && requestMap.containsKey("address")
                && requestMap.containsKey("url")
                && requestMap.containsKey("email")

        ){
            return true;
        }
        return  false;
    }

    private Company extractCompanyInfo(Map<String, String> requestMap,Company company){
        company.setName(requestMap.get("name"));
        company.setPhone(requestMap.get("phone"));
        company.setAddress(requestMap.get("address"));
        company.setUrl(requestMap.get("url"));
        company.setEmail(requestMap.get("email"));

        return company;
    }
    @Transactional
    public ResponseEntity<List<Company>> getAllCompany() {

        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                return new ResponseEntity<>(companyRepository.findAll(),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<Company> getCompany(long id) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                Company company =companyRepository.findById(id).orElse(null);
                if (!Objects.isNull(company)){
                    return new ResponseEntity<>(company,HttpStatus.OK);
                }
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> deleteCompany(long id) {
        try {
            if (jwtFilter.isAdmin()){
              Company company=companyRepository.findById(id).orElse(null);
              if (!Objects.isNull(company)){
                  companyRepository.delete(company);
                  return Helpers.getResponseEntity("Company has been deleted successfully!",HttpStatus.OK);
              }
              return Helpers.getResponseEntity("company id is not exist",HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> updateCompany(long id, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                Company company=companyRepository.findById(id).orElse(null);
                if(!Objects.isNull(company)){
                   if (isValidCompanyInfo(requestMap)){
                       Company comp=new Company();
                       companyRepository.deleteById(id);
                       company.setId(id);
                       companyRepository.save(extractCompanyInfo(requestMap,comp));
                       return Helpers.getResponseEntity("Company has been updated successfully",HttpStatus.OK);
                   }
                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
