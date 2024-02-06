package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.Scheduling;
import com.classscheduler.backend.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchedulingRepository  extends JpaRepository<Scheduling,Long> {


    List<Scheduling> findAllByTrainer(Trainer trainer);
    List<Scheduling> findAllByTrainerId(Long id);
}
