package com.classscheduler.backend.service;

import com.classscheduler.backend.config.CustomerUserDetailsService;

import com.classscheduler.backend.config.JwtFilter;
import com.classscheduler.backend.config.JwtUtil;
import com.classscheduler.backend.constants.ProjectConst;
import com.classscheduler.backend.model.User;
import com.classscheduler.backend.repository.UserRepository;
import com.classscheduler.backend.utils.EmailHelper;
import com.classscheduler.backend.utils.Helpers;
import jakarta.transaction.Transactional;
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

    EmailHelper emailHelper;

    JwtUtil jwtUtil;

    JwtFilter jwtFilter;

    CustomerUserDetailsService customerUserDetailsService;

    @Transactional
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        try {
            if (requestMap.containsKey("email") && requestMap.containsKey("password")) {
                Authentication auth = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));
                if (auth.isAuthenticated()) {
                    if (customerUserDetailsService.getUserDetail().getStatus().equalsIgnoreCase("ACTIVE")) {
                        return new ResponseEntity<>("{\"token\":\"" +
                                jwtUtil.genreateToken(customerUserDetailsService.getUserDetail().getEmail(),
                                        customerUserDetailsService.getUserDetail().getRole())
                                + "\",\"role\":\"" + customerUserDetailsService.getUserDetail().getRole()
                                + "\",\"id\":\"" + customerUserDetailsService.getUserDetail().getId()
                                + "\",\"city\":\"" + customerUserDetailsService.getUserDetail().getAddress() + "\"}",
                                HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("{\"message\":\"" + "This account is banned. " + "\"}",
                                HttpStatus.BAD_REQUEST);
                    }
                }
            } else
                return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
    }

    @Transactional
    public ResponseEntity<String> addAssistant(Map<String, String> requestyMap) {
        try {
            if (jwtFilter.isAdmin()) {
                if (validateSignUpMap(requestyMap)) {
                    User user = userRepository.findByEmail(requestyMap.get("email"));
                    if (Objects.isNull(user)) {
                        String password=Helpers.generatePassword();
                        user=new User();
                        user=getUserFromMap(requestyMap,user);
                        user.setPassword(passwordEncoder.encode(password));
                        userRepository.save(user);
                        String fullname = requestyMap.get("firstName") + " " + requestyMap.get("lastName");
                        emailHelper.sendLoginInfoEmail(requestyMap.get("email"), password, fullname,
                                "Assistant");
                        return Helpers.getResponseEntity("Successfully Registered", HttpStatus.OK);
                    } else {
                        return Helpers.getResponseEntity("Email already exist ", HttpStatus.BAD_REQUEST);
                    }

                } else
                    return Helpers.getResponseEntity(ProjectConst.INVALID_DATA, HttpStatus.BAD_REQUEST);
            } else {
                return Helpers.getResponseEntity(ProjectConst.UNAUTHORIZED8ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Helpers.getResponseEntity(ProjectConst.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // add admin
    @Transactional
    public void addAdmin() {

        if (Objects.isNull(userRepository.findByEmail("admin@gmail.com"))) {
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setPassword(passwordEncoder.encode("admin1234"));
            user.setRole("Admin");
            user.setStatus("ACTIVE");
            userRepository.save(user);
        }
    }

    private boolean validateSignUpMap(Map<String, String> reqMap) {
        return reqMap.containsKey("firstName") && reqMap.containsKey("lastName") && reqMap.containsKey("address")
                && reqMap.containsKey("email") && reqMap.containsKey("phone");
    }

    private User getUserFromMap(Map<String, String> requestMap,User user) {
       // User user = new User();
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setEmail(requestMap.get("email"));
        //user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setPhone(requestMap.get("phone"));
        user.setAddress(requestMap.get("address"));
        user.setStatus("ACTIVE");
        user.setRole("Assistant");
        return user;
    }

}
