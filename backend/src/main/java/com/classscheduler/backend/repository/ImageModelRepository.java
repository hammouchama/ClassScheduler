package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.ImagesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageModelRepository extends JpaRepository<ImagesModel,Long> {
}
