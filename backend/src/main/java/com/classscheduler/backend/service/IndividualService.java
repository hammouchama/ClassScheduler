package com.classscheduler.backend.service;

import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.Group;
import com.classscheduler.backend.model.Individual;
import com.classscheduler.backend.repository.FormationRepository;
import com.classscheduler.backend.repository.GroupRepository;
import com.classscheduler.backend.repository.IndividualRepository;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@AllArgsConstructor
@Service
public class IndividualService {
    IndividualRepository individualRepository;
    FormationRepository formationRepository;

    public ResponseEntity<String> register(long id, Map<String, String> requestMap) {
        try {
            // Retrieve the formation based on the provided ID
            Formation formation = formationRepository.findById(id).orElse(null);

            // Check if the provided information is valid, formation exists, and it's for individuals
            if (isValidInfo(requestMap)
                    || !Objects.isNull(formation)
            ) {
                if (formation.getCapacity()>individualRepository.countIndividualsByFormationId(id)){
                    Individual individual=extractData(requestMap);
                    individual.setFormation(formation);
                    individualRepository.save(individual);
                    return Helpers.getResponseEntity("You are registered successfully", HttpStatus.OK);
                }
                return Helpers.getResponseEntity("out of seats", HttpStatus.OK);
            }
            return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Print the stack trace in case of an exception
            e.printStackTrace();
        }

        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Individual extractData(Map<String, String> requestMap) {
        Individual individual=new Individual();
        individual.setName(requestMap.get("name"));
        individual.setPhone(requestMap.get("phone"));
        individual.setEmail(requestMap.get("email"));
        individual.setBirth_date(LocalDate.parse(requestMap.get("birth_date")));
        return individual;
    }

    private boolean isValidInfo(Map<String, String> requestMap) {
        if (
            requestMap.containsKey("name")
            && requestMap.containsKey("email")
            && requestMap.containsKey("phone")
            && requestMap.containsKey("ville")
            && requestMap.containsKey("birth_date")
        ) return true;

        return false;
    }
}
