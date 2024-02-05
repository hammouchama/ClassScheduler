package com.classscheduler.backend.repository;

import com.classscheduler.backend.dto.TrainerDTO;
import com.classscheduler.backend.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer,Long> {

    List<TrainerDTO> getTrainer();
    List<TrainerDTO> getAcceptedTrainers();

    Trainer findTrainerByEmail(String email);
}
