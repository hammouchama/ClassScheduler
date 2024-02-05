package com.classscheduler.backend.repository;

import com.classscheduler.backend.dto.FormationDTO;
import com.classscheduler.backend.dto.FormationDTOAdmin;
import com.classscheduler.backend.model.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation,Long> {

    List<FormationDTO> getAllActiveFormation();
    FormationDTO getPublicFormationById(@Param("id") long id);
    Formation findFormationByTitleAndCity(String title, String city);
    Formation findFormationBySlug(String slug);
    List<FormationDTOAdmin> findFormationByCity(String city);
    List<FormationDTOAdmin> findAllFormation();


}
