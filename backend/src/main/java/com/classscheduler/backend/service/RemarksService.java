package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.RemarksTokenValidationDTO;
import com.classscheduler.backend.model.Company;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.Individual;
import com.classscheduler.backend.model.Remarks;
import com.classscheduler.backend.repository.CompanyRepository;
import com.classscheduler.backend.repository.IndividualRepository;
import com.classscheduler.backend.repository.RemarksRepository;
import com.classscheduler.backend.repository.TrainerRepository;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RemarksService {

    RemarksRepository remarksRepository;
    TrainerRepository trainerRepository;
    IndividualRepository individualRepository;
    CompanyRepository companyRepository;
    JwtFilter jwtFilter;

    @Transactional
    public List<Remarks> getAllRemarks() {
        return remarksRepository.findAll();
    }

    @Transactional
    public Remarks getRemarksById(Long id) {
        Optional<Remarks> optionalRemarks = remarksRepository.findById(id);
        return optionalRemarks.orElse(null);
    }

    @Transactional
    public ResponseEntity<String> addRemarks(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                if(isValidRemarksInfo(requestMap)){
                    Remarks remarks=new Remarks();
                    remarksRepository.save(extractRemarksInfo(requestMap,remarks));
                    return  Helpers.getResponseEntity("Remarks has been added successfully",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> updateRemarks(Long id, Map<String, String> requestMap) {
        try {
            // Check if user is admin or assistant
//            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()) {
                Remarks remarks = remarksRepository.findById(id).orElse(null);

                // Check if the remarks exist
                if (!Objects.isNull(remarks)) {

                    // Validate requestMap data
                    if (isValidRemarksInfo(requestMap)) {

                        // Update the remarks entity
                        remarksRepository.save(extractRemarksInfo(requestMap, remarks));
                        return Helpers.getResponseEntity("Remarks has been updated successfully", HttpStatus.OK);
                    }

                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
                }

                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
//            }
//
//            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public ResponseEntity<String> deleteRemarks(long id) {
        try {
            if (jwtFilter.isAdmin()) {
                Remarks remarks = remarksRepository.findById(id).orElse(null);
                if (!Objects.isNull(remarks)) {
                    remarksRepository.delete(remarks);
                    return Helpers.getResponseEntity("Remarks has been deleted successfully!", HttpStatus.OK);
                }
                return Helpers.getResponseEntity("Remarks with the given id does not exist", HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    public void createEmptyRemarksWithToken(Individual individual, String remarksToken) {
        Remarks remarks = new Remarks();
        remarks.setToken(remarksToken);
        remarks.setIndividual(individual);

        remarksRepository.save(remarks);
    }

    // validate the remarks token and return RemarksTokenValidationDTO
    @Transactional
    public ResponseEntity<RemarksTokenValidationDTO> validateRemarksToken(String remarksToken) {
        RemarksTokenValidationDTO validationResult = new RemarksTokenValidationDTO();
        Remarks remarks = remarksRepository.findByToken(remarksToken);

        if (remarks != null  && remarks.getToken() != null) {

            validationResult.setFormation(remarks.getIndividual().getFormation());
            validationResult.setTrainer(remarks.getTrainer());

            validationResult.setValid(true);
            return new ResponseEntity<>(validationResult, HttpStatus.OK);


        }
        validationResult.setValid(false);
        validationResult.setError("Remarks token is invalid");
        return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
    }



    private Remarks extractRemarksInfo(Map<String, String> requestMap, Remarks remarks) {
        remarks.setNote_quality(Float.parseFloat(requestMap.get("note_quality")));
        remarks.setNote_rythme(Float.parseFloat(requestMap.get("note_rythme")));
        remarks.setNote_support_cours(Float.parseFloat(requestMap.get("note_support_cours")));
        remarks.setNote_support_tp(Float.parseFloat(requestMap.get("note_support_tp")));
        remarks.setNote_maitrise(Float.parseFloat(requestMap.get("note_maitrise")));

        // Assuming Trainer, Individual, and Company objects are already available
        // Set the corresponding objects using their IDs
        remarks.setTrainer(trainerRepository.findById(Long.parseLong(requestMap.get("trainer_id"))).orElse(null));
        remarks.setIndividual(individualRepository.findById(Long.parseLong(requestMap.get("individual_id"))).orElse(null));

        return remarks;
    }

    private boolean isValidRemarksInfo(Map<String, String> requestMap) {
        return requestMap.containsKey("note_quality")
                && requestMap.containsKey("note_rythme")
                && requestMap.containsKey("note_support_cours")
                && requestMap.containsKey("note_support_tp")
                && requestMap.containsKey("note_maitrise")
                && requestMap.containsKey("trainer_id")
                && requestMap.containsKey("individual_id")
                && requestMap.containsKey("company_id");
    }


}
