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
    private long id;
    private float note_quality;
    private float note_rythme;
    private float note_support_cours;
    private float note_support_tp;
    private float note_maitrise;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "formation_id")
    private Formation formation;
}
