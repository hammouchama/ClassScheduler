package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.config.JwtUtil;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.FormationDTOAdmin;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.ImagesModel;
import com.classscheduler.backend.model.Individual;
import com.classscheduler.backend.model.User;
import com.classscheduler.backend.repository.FormationRepository;
import com.classscheduler.backend.repository.ImageModelRepository;
import com.classscheduler.backend.repository.IndividualRepository;
import com.classscheduler.backend.repository.UserRepository;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class FormationService {
    FormationRepository formationRepository;
    IndividualRepository individualRepository;
    RemarksService remarksService;
    JwtFilter jwtFilter;
    JwtUtil jwtUtil;
    ModelMapper modelMapper;
    ImageModelRepository imageModelRepository;
    UserRepository userRepository;

    @Transactional
    public ResponseEntity<String> addFormation(Map<String, String> requestyMap, MultipartFile image) {
        try {
            if (jwtFilter.isAdmin()) {
                if (isValidData(requestyMap)) {
                    Formation formationExist=formationRepository.findFormationByTitleAndCity(requestyMap.get("title"),requestyMap.get("city"));
                    if (Objects.isNull(formationExist)){
                        Formation formation = new Formation();
                        formation =extractFormationInfo(requestyMap, formation);
                        if (formation.getStart_registration().compareTo(formation.getEnd_registration())<0){
                            // extract photo
                            if (image != null) {
                                ImagesModel imagesModel = new ImagesModel();
                                imagesModel.setName(image.getName());
                                imagesModel.setType(image.getContentType());
                                imagesModel.setBytes(image.getBytes());
                                imagesModel = imageModelRepository.save(imagesModel);
                                formation.setPhoto(imagesModel);
                            }
                            // #################################*/
                            formationRepository.save(formation);
                            return Helpers.getResponseEntity("Successfully Registered", HttpStatus.OK);
                        }
                        return Helpers.getResponseEntity("end registration date must be grater than end start registration date",HttpStatus.BAD_REQUEST);
                    }
                    return Helpers.getResponseEntity("This Formation are ready exist",HttpStatus.BAD_REQUEST);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (DataIntegrityViolationException e) {
            // Handle unique constraint violation
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                return Helpers.getResponseEntity("Unique constraint violation: " + e.getRootCause().getMessage(), HttpStatus.BAD_REQUEST);
            }

            // Handle other exceptions if needed
            return Helpers.getResponseEntity("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean isValidData(Map<String, String> requestyMap) {
        if (requestyMap.containsKey("title")
                && requestyMap.containsKey("category")
                && requestyMap.containsKey("city")
                && requestyMap.containsKey("nb_hours")
                && requestyMap.containsKey("objective")
                && requestyMap.containsKey("description")
                && requestyMap.containsKey("cost")
                && requestyMap.containsKey("capacity")
                && requestyMap.containsKey("start_registration")
                && requestyMap.containsKey("end_registration")
                && requestyMap.containsKey("slug")) {
            return true;
        }
        return false;
    }

    private Formation extractFormationInfo(Map<String, String> requestyMap, Formation formation) {
        // print requestyMap in console
        System.out.println(requestyMap);

        formation.setTitle(requestyMap.get("title"));
        formation.setCategory(requestyMap.get("category"));
        formation.setCity(requestyMap.get("city"));
        formation.setCost(Float.parseFloat(requestyMap.get("cost")));
        formation.setDescription(requestyMap.get("description"));
        formation.setObjective(requestyMap.get("objective"));
        formation.setNb_hours(Integer.parseInt(requestyMap.get("nb_hours")));
        formation.setCapacity(Integer.parseInt(requestyMap.get("capacity")));
        formation.setStart_registration(LocalDate.parse(requestyMap.get("start_registration")));
        formation.setEnd_registration(LocalDate.parse(requestyMap.get("end_registration")));
        formation.setSlug(requestyMap.get("slug"));
        return formation;
    }

    @Transactional
    public ResponseEntity<List<FormationDTOAdmin>> getAllFormation() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<>(formationRepository.findAllFormation(), HttpStatus.OK);
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<FormationDTOAdmin> getFormation(long id) {
        try {
            if (jwtFilter.isAdmin()) {
                Formation formation = formationRepository.findById(id).orElse(null);
                if (!Objects.isNull(formation)) {
                    //System.out.println(formation.getPhoto().getBytes());
                    return new ResponseEntity<>(modelMapper.map(formation, FormationDTOAdmin.class), HttpStatus.OK);
                }
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> deleteFormation(long id) {
        try {
            if (jwtFilter.isAdmin()) {
                Formation formation = formationRepository.findById(id).orElse(null);
                if (!Objects.isNull(formation)) {
                    formationRepository.delete(formation);
                    return Helpers.getResponseEntity("Formation deleted successfully", HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> updateFormation(long id, Map<String, String> requestMap, MultipartFile image) {
        try {
            if (jwtFilter.isAdmin()) {
                if (isValidData(requestMap)) {
                    Formation formation = formationRepository.findById(id).orElse(null);
                    if (!Objects.isNull(formation)) {
                        formation=formationRepository.findById(id).get();
                        formation = extractFormationInfo(requestMap, formation);
                        if(formation.getStart_registration().compareTo(formation.getEnd_registration())<0){
                            ImagesModel photo = formation.getPhoto();

                            if (image != null) {
                                if(photo==null){
                                    photo = new ImagesModel();
                                }
                                photo.setName(image.getName());
                                photo.setType(image.getContentType());
                                photo.setBytes(image.getBytes());
                                formation.setPhoto(photo);
                            }

                            formationRepository.save(formation);
                            return Helpers.getResponseEntity("Formation has update successfully", HttpStatus.OK);
                        }
                        return Helpers.getResponseEntity("end registration date must be grater than end start registration date",HttpStatus.BAD_REQUEST);
                    }
                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<FormationDTO>> getAllPublicFormation() {
        try {
            return new ResponseEntity<>(formationRepository.getAllActiveFormation(),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<FormationDTO> getPublicFormation(long id) {
        try {
            Formation f=formationRepository.findById(id).orElse(null);
            if (!Objects.isNull(f)){
              return new ResponseEntity<>(formationRepository.getPublicFormationById(id),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<FormationDTO> getFormationBySlug(String slug) {
        try {
            Formation formation=formationRepository.findFormationBySlug(slug);
            if (!Objects.isNull(formation)){
                return new ResponseEntity<>(modelMapper.map(formation,FormationDTO.class),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }




    @Transactional
    public ResponseEntity<String> endFormationAndGenerateTokens(long formationId, long trainerId) {
        try {
                Formation formation = formationRepository.findById(formationId).orElse(null);

                if (!Objects.isNull(formation)) {
                    List<Individual> relatedIndividuals = individualRepository.findIndividualsByFormationId(formationId);
                    String remarksToken = jwtUtil.generateRemarksToken("email@gmaom.com", formationId, trainerId);

                    /*for (Individual individual : relatedIndividuals) {
                        String remarksToken = jwtUtil.generateRemarksToken(individual.getEmail(), individual.getId(), formation.getId());
                        // Send the remarksToken to the individual's email
                        System.out.println("Remarks token for " + remarksToken);
                    }*/

                    // Additional logic for ending the formation...
                    // For example, set the formation status to "ENDED"

                    return Helpers.getResponseEntity("Formation ended successfully and tokens generated : "+remarksToken, HttpStatus.OK);
                }

                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            e.printStackTrace();
            return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<FormationDTOAdmin>> getAllByCityFormation() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<>(formationRepository.findAllFormation(), HttpStatus.OK);
            }else if(jwtFilter.isAssistant()){
                User user=userRepository.findByEmail(jwtFilter.getCurrentUser());
                if (user!=null){
                    return new ResponseEntity<>(formationRepository.findFormationByCity(user.getAddress()), HttpStatus.OK);
                }
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
