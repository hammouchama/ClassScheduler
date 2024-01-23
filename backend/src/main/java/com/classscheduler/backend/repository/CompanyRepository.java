package com.classscheduler.backend.repository;

import com.classscheduler.backend.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company ,Long> {
}
