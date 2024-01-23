package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long> {

    @Query("SELECT COUNT(g) FROM Group g WHERE g.formation = :formation AND g.is_old = false")
    int countGroupsByFormationAndIsOldFalse(@Param("formation") Formation formation);

    @Query("SELECT g FROM Group g WHERE g.formation = :formation AND g.is_old = false")
    List<Group> findAllByFormation(@Param("formation") Formation formation);
}
