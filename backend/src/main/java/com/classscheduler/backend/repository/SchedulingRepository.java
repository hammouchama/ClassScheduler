package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.Scheduling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulingRepository  extends JpaRepository<Scheduling,Long> {
}
