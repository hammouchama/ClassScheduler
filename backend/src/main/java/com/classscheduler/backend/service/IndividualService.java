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
    GroupRepository groupRepository;

    public ResponseEntity<String> register(long id, Map<String, String> requestMap) {
        try {
            // Retrieve the formation based on the provided ID
            Formation formation = formationRepository.findById(id).orElse(null);

            // Check if the provided information is valid, formation exists, and it's for individuals
            if (isValidInfo(requestMap)
                    || !Objects.isNull(formation)
            ) {

                // Retrieve the number of groups for the given formation
                int numberOfGroups = groupRepository.countGroupsByFormationAndIsOldFalse(formation);

                // Extract individual data from the provided map
                Individual individual = extractData(requestMap);

                // Retrieve all groups associated with the formation
                List<Group> groups = groupRepository.findAllByFormation(formation);

                // Generate a group name based on the number of groups
                String groupName = "group_" + numberOfGroups;

                // Check conditions to decide if a new group needs to be created
                if (numberOfGroups == 0
                        || individualRepository.countIndividualsByGroupId(groups.get(groups.size() - 1).getId()) == formation.getCapacity()) {
                    // Create a new group if conditions are met
                    Group group = new Group();
                    group.setGroupName(groupName);
                    group.setFormation(formation);
                    group = groupRepository.save(group);
                    individual.setGroup(group);
                } else {
                    // Otherwise, assign the individual to the last existing group
                    individual.setGroup(groups.get(groups.size() - 1));
                }

                individualRepository.save(individual);

                return Helpers.getResponseEntity("You are registered successfully", HttpStatus.OK);
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
