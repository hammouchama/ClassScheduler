package com.classscheduler.backend.repository;


import com.classscheduler.backend.dto.AssistantDTO;
import com.classscheduler.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmail(@Param("email") String email);

    List<AssistantDTO> findAllAssistant();

    User findAssistantById(@Param("id") long id);
}
