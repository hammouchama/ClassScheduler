package com.classscheduler.backend.service;

import com.classscheduler.backend.config.CustomerUserDetailsService;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.config.JwtUtil;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.User;
import com.classscheduler.backend.repository.UserRepository;
import com.classscheduler.backend.utils.Helpers;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class UserService {

     UserRepository userRepository;

     BCryptPasswordEncoder passwordEncoder;

     AuthenticationManager authenticationManager;

    JwtUtil jwtUtil;

    JwtFilter jwtFilter;

     CustomerUserDetailsService customerUserDetailsService;

    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
              if(requestMap.containsKey("email")&& requestMap.containsKey("password")){
                  Authentication auth=authenticationManager.authenticate(
                          new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password"))
                  );
                  if(auth.isAuthenticated()){
                      if (customerUserDetailsService.getUserDetail().getStatus().equalsIgnoreCase("ACTIVE")){
                          return new ResponseEntity<>("{\"token\":\""+
                                  jwtUtil.genreateToken(customerUserDetailsService.getUserDetail().getEmail(),
                                          customerUserDetailsService.getUserDetail().getRole())+"\",\"role\":\""+customerUserDetailsService.getUserDetail().getRole()+"\"}",HttpStatus.OK);
                      }else {
                          return new ResponseEntity<>("{\"message\":\""+"This account is banned. "+"\"}",HttpStatus.BAD_REQUEST);
                      }
                  }
              }else return Helpers.getResponseEntity(ProjectConst.INVALID_DATA,HttpStatus.BAD_REQUEST);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> addAssistant(Map<String, String> requestyMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateSignUpMap(requestyMap)) {
                    User user = userRepository.findByEmail(requestyMap.get("email"));
                    if (Objects.isNull(user)) {
                        userRepository.save(getUserFromMap(requestyMap));
                        return Helpers.getResponseEntity("Successfully Registered", HttpStatus.OK);
                    } else {
                        return Helpers.getResponseEntity("Email already exist ", HttpStatus.BAD_REQUEST);
                    }

                } else return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else {
                return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS,HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private boolean validateSignUpMap(Map<String,String> reqMap){
        return  reqMap.containsKey("firstName") && reqMap.containsKey("lastName") && reqMap.containsKey("address")
                && reqMap.containsKey("email") &&reqMap.containsKey("password") && reqMap.containsKey("phone");
    }

    private User getUserFromMap(Map<String,String> requestMap){
        User user=new User();
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setPhone(requestMap.get("phone"));
        user.setAddress(requestMap.get("address"));
        user.setStatus("ACTIVE");
        user.setRole("assistant");
        return user;
    }


}
