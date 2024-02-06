package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.TrainerDTO;
import com.classscheduler.backend.model.*;
import com.classscheduler.backend.repository.*;
import com.classscheduler.backend.utils.EmailHelper;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@AllArgsConstructor
public class TrainerService {
    TrainerRepository trainerRepository;
    JwtFilter jwtFilter;
    FormationRepository formationRepository;
    ImageModelRepository imageModelRepository;
    BCryptPasswordEncoder passwordEncoder;
    EmailHelper emailHelper;
    ModelMapper modelMapper;
    UserRepository userRepository;
    SchedulingRepository schedulingRepository;
    RemarksRepository remarksRepository;

    @Transactional
    public ResponseEntity<String> registerTrainer(Map<String, String> requestMap , MultipartFile image) {
        try{
           if (isValidInfo(requestMap)){
               Trainer trainerShech =trainerRepository.findTrainerByEmail(requestMap.get("email"));
               if (Objects.isNull(trainerShech)) {
                   Trainer trainer = new Trainer();
                   //###############photo###############
                   if (image != null) {
                       ImagesModel photo = new ImagesModel();
                       photo.setName(image.getName());
                       photo.setType(image.getContentType());
                       photo.setBytes(image.getBytes());
                       photo = imageModelRepository.save(photo);
                       trainer.setPhoto(photo);
                   }
                   //##############################
                   extractTrainerInfo(requestMap, trainer);

                   trainerRepository.save(trainer);
                   return Helpers.getResponseEntity("Register successfully", HttpStatus.OK);
               }
               return Helpers.getResponseEntity("Email are ready exist", HttpStatus.BAD_REQUEST);
               }
           return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Trainer extractTrainerInfo(Map<String, String> requestMap, Trainer trainer) {
        trainer.setFirstName(requestMap.get("firstName"));
        trainer.setLastName(requestMap.get("lastName"));
        trainer.setEmail(requestMap.get("email"));
        trainer.setAddress(requestMap.get("address"));
        trainer.setDescription(requestMap.get("description"));
        trainer.setSkills(requestMap.get("skills"));
        trainer.setPhone(requestMap.get("phone"));
        return trainer;
    }

    private boolean isValidInfo(Map<String, String> requestMap) {
        if(
                requestMap.containsKey("firstName")
                && requestMap.containsKey("lastName")
                && requestMap.containsKey("phone")
                && requestMap.containsKey("address")
                && requestMap.containsKey("email")
                && requestMap.containsKey("skills")
                && requestMap.containsKey("description")
        ){
            return  true;
        }
        return false;
    }

    @Transactional
    public ResponseEntity<List<TrainerDTO>> getTrainersNotAccepted() {
      try {
         if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
             return new ResponseEntity<>(trainerRepository.getTrainer(),HttpStatus.OK);
         }
         return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
      }catch (Exception e){
          e.printStackTrace();
      }
      return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @Transactional
    public ResponseEntity<TrainerDTO> getTrainerById(long id) {
        try {
             if (jwtFilter.isAdmin()|| jwtFilter.isAssistant()){
                 Trainer trainer=trainerRepository.findById(id).orElse(null);
                 if (!Objects.isNull(trainer)){
                     return new ResponseEntity<>(TrainerDTO.fromTrainerToTrainerTDO(trainer),HttpStatus.OK);
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
    public ResponseEntity<String> acceptTrainer(long id) {
        try {
            if (jwtFilter.isAssistant()|| jwtFilter.isAdmin()){
                Optional<Trainer> trainer1=trainerRepository.findById(id);
                if(!Objects.isNull(trainer1.get())){
                    Trainer trainer=trainer1.get();
                    String password=Helpers.generatePassword();
                    String username=trainer.getFirstName()+" "+trainer.getLastName();
                   // trainerRepository.deleteById(id);
                    trainer.setPassword(passwordEncoder.encode(password));
                    trainer.setAccepted("true");
                    trainerRepository.save(trainer);
                    User newuser=modelMapper.map(trainer, User.class);
                    newuser.setRole("Trainer");
                    newuser.setStatus("ACTIVE");
                    userRepository.save(newuser);
                    emailHelper.sendLoginInfoEmail(trainer.getEmail(),password,username,"Trainer");
                    return Helpers.getResponseEntity("Trainer has been accepted successfully",HttpStatus.OK);
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
    public ResponseEntity<String> deleteTrainer(long id) {
        try {
            if (jwtFilter.isAdmin()|| jwtFilter.isAssistant()){
                Trainer trainer=trainerRepository.findById(id).orElse(null);
                if(!Objects.isNull(trainer)){
                    // gets all the remarks that the trainer is assigned to
                    List<Scheduling> schedulings = schedulingRepository.findAllByTrainer(trainer);
                    for (Scheduling scheduling:schedulings) {
                        scheduling.setTrainer(null);
                        schedulingRepository.save(scheduling);
                    }
                    List<Remarks> remarks = remarksRepository.findAllByTrainerId(trainer.getId());
                    // deletes all the remarks
                    remarksRepository.deleteAll(remarks);

                    trainerRepository.delete(trainer);
                    return Helpers.getResponseEntity("Trainer has been deleted successfully",HttpStatus.OK);
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
    public ResponseEntity<String> updateTrainer(long id,Map<String, String> requestMap) {
        try {
            if (jwtFilter.isTrainer()){
                Trainer trainer=trainerRepository.findById(id).orElse(null);
                if(!Objects.isNull(trainer) || isValidInfo(requestMap)){
                    trainer=extractTrainerInfo(requestMap,trainer);
                    trainerRepository.save(trainer);
                    return Helpers.getResponseEntity("trainer information has been updated successfully",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<TrainerDTO>> getAcceptedTrainers() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                return new ResponseEntity<>(trainerRepository.getAcceptedTrainers(),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<List<Scheduling>> getScheduling() {
        try {
            if (jwtFilter.isTrainer()){
              Trainer trainer =trainerRepository.findTrainerByEmail(jwtFilter.getCurrentUser());
              if (trainer!=null){
                  return new ResponseEntity<>(schedulingRepository.findAllByTrainer(trainer),HttpStatus.OK);
              }
              return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
