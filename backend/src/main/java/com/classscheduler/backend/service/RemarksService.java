package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.config.JwtUtil;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.RemarksTokenValidationDTO;
import com.classscheduler.backend.dto.TrainerDTO;
import com.classscheduler.backend.model.*;
import com.classscheduler.backend.repository.*;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
    FormationRepository formationRepository;
    CompanyRepository companyRepository;
    JwtFilter jwtFilter;
    JwtUtil jwtUtil;
    ModelMapper modelMapper;

    @Transactional
    public List<Remarks> getAllRemarks() {
        return remarksRepository.findAll();
    }

    // get all remarks by trainer id
    @Transactional
    public List<Remarks> getAllRemarksByTrainerId(Long id) {
        return remarksRepository.findAllByTrainerId(id);
    }
    @Transactional
    public Remarks getRemarksById(Long id) {
        Optional<Remarks> optionalRemarks = remarksRepository.findById(id);
        return optionalRemarks.orElse(null);
    }

    @Transactional
    public ResponseEntity<String> addRemarks(Map<String, String> requestMap) {
        System.out.println("requestMap2");
        System.out.println(requestMap);
        try {
            System.out.println(requestMap);
                if(isValidRemarksInfo(requestMap)){
                    Remarks remarks=new Remarks();
                    System.out.println(extractRemarksInfo(requestMap,remarks));
                    remarksRepository.save(extractRemarksInfo(requestMap,remarks));
                    return  Helpers.getResponseEntity("Remarks has been added successfully",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);

        }catch (Exception e){
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

    // validate the remarks token and return RemarksTokenValidationDTO
    @Transactional
    public ResponseEntity<RemarksTokenValidationDTO> validateRemarksToken(String remarksToken) {
        RemarksTokenValidationDTO validationResult = new RemarksTokenValidationDTO();
        // get from validateRemarksToken method in JwtUtil
        System.out.println(remarksToken);
        Map<String, Object> remarksInfo = jwtUtil.validateRemarksToken(remarksToken);



        System.out.println(remarksInfo);
        if (remarksInfo != null) {
            System.out.println(remarksInfo.get("formation_id"));
            System.out.println(remarksInfo.get("trainer_id"));
            Long formationId = Long.parseLong(remarksInfo.get("formation_id").toString());
            Long trainerId = Long.parseLong(remarksInfo.get("trainer_id").toString());
            if(formationId == null || trainerId == null){
                if(formationId == null){
                    validationResult.setError("Remarks token is invalid, Formation id is invalid");
                } else {
                    validationResult.setError("Remarks token is invalid, Trainer id is invalid");
                }
                validationResult.setValid(false);
                return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
            }

            Formation formation = formationRepository.findById(formationId).orElse(null);
            Trainer trainer = trainerRepository.findById(trainerId).orElse(null);

            if(formation == null || trainer == null){
                if(formation == null){
                    validationResult.setError("Formation with the given id does not exist");
                } else {
                    validationResult.setError("Trainer with the given id does not exist");
                }
                validationResult.setValid(false);
                return new ResponseEntity<>(validationResult, HttpStatus.BAD_REQUEST);
            }
           TrainerDTO trainerDTO = modelMapper.map(trainer, TrainerDTO.class);
            trainerDTO.setPhoto(trainer.getPhoto().getBytes());
            validationResult.setFormation(FormationDTO.fromFormatioToFromationDTO(formation));
            validationResult.setTrainer(trainerDTO);

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
        remarks.setFormation(formationRepository.findById(Long.parseLong(requestMap.get("formation_id"))).orElse(null));

        return remarks;
    }

    private boolean isValidRemarksInfo(Map<String, String> requestMap) {
        return requestMap.containsKey("note_quality")
                && requestMap.containsKey("note_rythme")
                && requestMap.containsKey("note_support_cours")
                && requestMap.containsKey("note_support_tp")
                && requestMap.containsKey("note_maitrise")
                && requestMap.containsKey("trainer_id")
                && requestMap.containsKey("formation_id");
    }


}
