package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Remarks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Float note_quality;
    private Float note_rythme;
    private Float note_support_cours;
    private Float note_support_tp;
    private Float note_maitrise;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "formation_id")
    private Formation formation;

    }
