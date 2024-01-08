package com.classscheduler.backend.config;

import com.classscheduler.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    private com.classscheduler.backend.model.User userDetail;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        userDetail=userRepository.findByEmail(username);
        if (!Objects.isNull(userDetail)){
            return new User(userDetail.getEmail(),userDetail.getPassword(),new ArrayList<>());
        }else {
            throw new UsernameNotFoundException("User not found");
        }
    }
    public com.classscheduler.backend.model.User getUserDetail(){

        /*com.cofe.cafe_server.POJO.User usr=userDetail;
        usr.setPassword(null);*/
        return userDetail;
    }
}
