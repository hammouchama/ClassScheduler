package com.classscheduler.backend.repository;

import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.model.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

    List<FormationDTO> getAllActiveFormation();
}
