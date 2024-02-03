package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRepository extends JpaRepository<Individual,Long> {

    @Query("SELECT COUNT(i) FROM Individual i WHERE i.formation.id = :formationId and i.is_archived=false")
    Long countIndividualsByFormationId(@Param("formationId") Long formationId);

}
