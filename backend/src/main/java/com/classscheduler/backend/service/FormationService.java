package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.FormationDTOAdmin;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.repository.FormationRepository;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class FormationService {
    FormationRepository formationRepository;
    JwtFilter jwtFilter;
    ModelMapper modelMapper;

    public ResponseEntity<String> addFormation(Map<String, String> requestyMap) {
        try{
            if (jwtFilter.isAdmin()){
                if (isValidData(requestyMap)){
                    formationRepository.save(extractFormationInfo(requestyMap));
                    return Helpers.getResponseEntity("Successfully Registered",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean isValidData(Map<String, String> requestyMap) {
        if (
                requestyMap.containsKey("title")
                && requestyMap.containsKey("category")
                && requestyMap.containsKey("city")
                && requestyMap.containsKey("nb_hours")
                && requestyMap.containsKey("objective")
                && requestyMap.containsKey("description")
                && requestyMap.containsKey("cost")
        ){
            return true;
        }
        return false;
    }
    private Formation extractFormationInfo(Map<String, String> requestyMap){
        Formation formation =new Formation();
        formation.setTitle(requestyMap.get("title"));
        formation.setCategory(requestyMap.get("category"));
        formation.setCity(requestyMap.get("city"));
        formation.setCost(Float.parseFloat(requestyMap.get("cost")));
        formation.setDescription(requestyMap.get("description"));
        formation.setObjective(requestyMap.get("objective"));
        formation.setNb_hours(Integer.parseInt(requestyMap.get("nb_hours")));

        return formation;
    }

    public ResponseEntity<List<Formation>> getAllFormation() {
        try {
            if (jwtFilter.isAdmin()){
                return new ResponseEntity<>(formationRepository.findAll() ,HttpStatus.OK);
            }
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<Object> getFormation(long id) {
        try {
            Formation formation=formationRepository.findById(id).orElse(null);
            if (!Objects.isNull(formation)){
               if (jwtFilter.isAdmin()){
                    return new ResponseEntity<>(modelMapper.map(formation, FormationDTOAdmin.class),HttpStatus.OK);
               }
               return new ResponseEntity<>(modelMapper.map(formation, FormationDTO.class),HttpStatus.OK);

            }
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteFormation(long id) {
        try {
            if (jwtFilter.isAdmin()){
               Formation formation=formationRepository.findById(id).orElse(null);
               if (!Objects.isNull(formation)){
                   formationRepository.delete(formation);
                   return Helpers.getResponseEntity("Formation deleted successfully",HttpStatus.OK);
               }
               return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> updateFormation(long id, Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin()){
                if (isValidData(requestMap)){
                    Formation formation=formationRepository.findById(id).orElse(null);
                    if (!Objects.isNull(formation)){
                       formation=extractFormationInfo(requestMap);
                       formation.setId(id);
                       formationRepository.save(formation);
                       return Helpers.getResponseEntity("Formation has update successfully",HttpStatus.OK);
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
