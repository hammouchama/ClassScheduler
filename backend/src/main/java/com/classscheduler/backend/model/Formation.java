package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NamedQuery(name = "Formation.getAllActiveFormation", query = "select new com.classscheduler.backend.dto.FormationDTO(f.id,f.title,f.category,f.city,f.nb_hours, f.objective, f.description,f.for_individual,f.photo.url)"
        +
        " from Formation f where f.status='ACTIVE'")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private String city;
    private int nb_hours;
    private String objective;
    private String description;
    private String status = "ACTIVE";
    private float cost = 0.00F;
    private String for_individual = "false";
    private int capacity;
    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private ImagesModel photo;

}
