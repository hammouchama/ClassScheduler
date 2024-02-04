package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.Company;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.Scheduling;
import com.classscheduler.backend.model.Trainer;
import com.classscheduler.backend.repository.CompanyRepository;
import com.classscheduler.backend.repository.FormationRepository;
import com.classscheduler.backend.repository.SchedulingRepository;
import com.classscheduler.backend.repository.TrainerRepository;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class SchedulingService {
    JwtFilter jwtFilter;
    FormationRepository formationRepository;
    TrainerRepository trainerRepository;
    SchedulingRepository schedulingRepository;
    CompanyRepository companyRepository;

    public ResponseEntity<String> addScheduling(Map<String, String> requestMap) {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                if(isValidData(requestMap)){
                    Formation formation=formationRepository.findById(Long.valueOf(requestMap.get("formation"))).get();
                    Trainer  trainer =trainerRepository.findById(Long.valueOf(requestMap.get("trainer"))).get();
                    if (formation!=null && trainer!=null){
                        Scheduling scheduling =new Scheduling();
                        scheduling.setTitle(requestMap.get("title"));
                        scheduling.setFormation(formation);
                        scheduling.setTrainer(trainer);
                        scheduling.setStart_date_time(convertMillisToLocalDateTime(Long.parseLong(requestMap.get("start_dateTime"))));
                        scheduling.setEnd_date_time(convertMillisToLocalDateTime(Long.parseLong(requestMap.get("end_dateTime"))));
                        if ("company".equals(requestMap.get("selectedOption"))){
                            Company company=companyRepository.findById(Long.valueOf(requestMap.get("company"))).get();
                            scheduling.setCompany(company);
                            scheduling.setFor_company(true);
                        }else {
                            scheduling.setFor_company(false);
                        }
                        schedulingRepository.save(scheduling);
                        return Helpers.getResponseEntity("scheduling added successfully",HttpStatus.OK);
                    }
                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);

        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean isValidData(Map<String, String> requestMap) {
        if (
                requestMap.containsKey("title")
                && requestMap.containsKey("formation")
                && requestMap.containsKey("trainer")
                && requestMap.containsKey("selectedOption")
                && requestMap.containsKey("start_dateTime")
                && requestMap.containsKey("end_dateTime")
        ){
            return true;
        }
        return false;
    }
    private static LocalDateTime convertMillisToLocalDateTime(long milliseconds) {
        // Convert milliseconds to Instant
        Instant instant = Instant.ofEpochMilli(milliseconds);

        // Convert Instant to LocalDateTime in a specific time zone (adjust the ZoneId accordingly)
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());

        return localDateTime;
    }

    public ResponseEntity<List<Scheduling>> getAllSchadeuling() {
        try {
            if (jwtFilter.isAdmin() || jwtFilter.isAssistant()){
                return new ResponseEntity<>(schedulingRepository.findAll(),HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteScheduling(long id) {
        try {
            if (jwtFilter.isAssistant()|| jwtFilter.isAdmin()){
                Scheduling scheduling=schedulingRepository.findById(id).orElse(null);
                if (!Objects.isNull(scheduling)){
                    schedulingRepository.deleteById(id);
                    return Helpers.getResponseEntity("Deleted successfully",HttpStatus.OK);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> upadateScheduling(long id, Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()||jwtFilter.isAssistant()){
                Scheduling scheduling=schedulingRepository.findById(id).get();
                if(isValidData(requestMap)&& !Objects.isNull(scheduling)){
                    Formation formation=formationRepository.findById(Long.valueOf(requestMap.get("formation"))).get();
                    Trainer  trainer =trainerRepository.findById(Long.valueOf(requestMap.get("trainer"))).get();
                    if (formation!=null && trainer!=null) {
                        scheduling.setTitle(requestMap.get("title"));
                        scheduling.setFormation(formation);
                        scheduling.setTrainer(trainer);
                        scheduling.setStart_date_time(convertMillisToLocalDateTime(Long.parseLong(requestMap.get("start_dateTime"))));
                        scheduling.setEnd_date_time(convertMillisToLocalDateTime(Long.parseLong(requestMap.get("end_dateTime"))));
                        if ("company".equals(requestMap.get("selectedOption"))) {
                            Company company = companyRepository.findById(Long.valueOf(requestMap.get("company"))).get();
                            scheduling.setCompany(company);
                            scheduling.setFor_company(true);
                        } else {
                            scheduling.setFor_company(false);

                        }
                        schedulingRepository.save(scheduling);
                        return Helpers.getResponseEntity("scheduling updated successfully", HttpStatus.OK);
                    }
                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
                }
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);

        }catch(Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
