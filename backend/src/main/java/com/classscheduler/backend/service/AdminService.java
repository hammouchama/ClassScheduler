package com.classscheduler.backend.service;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.dto.AssistantDTO;
import com.classscheduler.backend.model.User;
import com.classscheduler.backend.repository.UserRepository;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AdminService {
    UserRepository userRepository;
    JwtFilter jwtFilter;



    public ResponseEntity<List<AssistantDTO>> getAllAssistant() {
        try {
            if (jwtFilter.isAdmin()){
                   return  new ResponseEntity<>(userRepository.findAllAssistant(),HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new ArrayList<>(),HttpStatus.UNAUTHORIZED);
            }

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<AssistantDTO> getAssistant(long id) {
        try {
            if (jwtFilter.isAdmin()){
                System.out.println("here");
                ModelMapper modelMapper=new ModelMapper();
                User user=userRepository.findAssistantById(id);
                if (!Objects.isNull(user))
                return new ResponseEntity<>(modelMapper.map(user,AssistantDTO.class),HttpStatus.OK);
                else return new ResponseEntity<>(null,HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> deleteAssistant(long id) {
        try {
            if (jwtFilter.isAdmin()){
                User user=userRepository.findAssistantById(id);
                if (!Objects.isNull(user)){
                    userRepository.delete(user);
                    return Helpers.getResponseEntity("Assistant deleted successfully",HttpStatus.OK);
                }
                else return Helpers.getResponseEntity("Invalid Assistant id",HttpStatus.BAD_REQUEST);
            }
            return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);

        }catch (Exception ex){
            ex.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
