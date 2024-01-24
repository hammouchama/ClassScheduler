package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.FormationDTOAdmin;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.ImagesModel;
import com.classscheduler.backend.repository.FormationRepository;
import com.classscheduler.backend.repository.ImageModelRepository;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    ImageModelRepository imageModelRepository;

    @Transactional
    public ResponseEntity<String> addFormation(Map<String, String> requestyMap,MultipartFile image) {
        try{
            if (jwtFilter.isAdmin()){
                if (isValidData(requestyMap)){
                    Formation formation=new Formation();
                    //extract photo
                    if(image!=null){
                        ImagesModel imagesModel=new ImagesModel();
                        imagesModel.setName(image.getName());
                        imagesModel.setType(image.getContentType());
                        imagesModel.setUrl("http://localhost:8080/images/formation/"+Helpers.saveImage(image,true));
                        imagesModel = imageModelRepository.save(imagesModel);
                        formation.setPhoto(imagesModel);
                    }
                    //#################################*/
                    formationRepository.save(extractFormationInfo(requestyMap,formation));
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
                && requestyMap.containsKey("for_individual")
        ){
            return true;
        }
        return false;
    }

    private Formation extractFormationInfo(Map<String, String> requestyMap,Formation formation){
        formation.setTitle(requestyMap.get("title"));
        formation.setCategory(requestyMap.get("category"));
        formation.setCity(requestyMap.get("city"));
        formation.setCost(Float.parseFloat(requestyMap.get("cost")));
        formation.setDescription(requestyMap.get("description"));
        formation.setObjective(requestyMap.get("objective"));
        formation.setNb_hours(Integer.parseInt(requestyMap.get("nb_hours")));
        formation.setFor_individual(requestyMap.get("for_individual"));

        return formation;
    }

    @Transactional
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

    @Transactional
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

    @Transactional
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

    @Transactional
    public ResponseEntity<String> updateFormation(long id, Map<String, String> requestMap,MultipartFile image) {
        try {
            if (jwtFilter.isAdmin()){
                if (isValidData(requestMap)){
                    Formation formation=formationRepository.findById(id).orElse(null);
                    if (!Objects.isNull(formation)){
                        ImagesModel photo=formation.getPhoto();
                        if (image!=null){
                            photo.setName(image.getName());
                            photo.setType(image.getContentType());
                            photo.setUrl("http://localhost:8080/images/formation/"+Helpers.saveImage(image,true));
                            formation.setPhoto(photo);
                        }
                       formation=extractFormationInfo(requestMap,formation);
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