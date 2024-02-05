package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Scheduling {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
   // private String description;
    //private LocalDate date;
    private LocalDateTime start_date_time;
    private LocalDateTime end_date_time;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "formation",nullable = true)
    private Formation formation;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "company_id",nullable = true)
    private Company company;

    private boolean for_company;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "trainer_id",nullable = true)
    private Trainer trainer;

}
