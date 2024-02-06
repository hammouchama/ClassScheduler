package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NamedQuery(name = "Formation.getAllActiveFormation", query = "select new com.classscheduler.backend.dto.FormationDTO(f.id,f.title,f.category,f.city,f.nb_hours, f.objective, f.description,f.photo.bytes,f.start_registration,f.end_registration,f.cost,f.slug)"
        +
        " from Formation f where f.status='ACTIVE'")
@NamedQuery(name = "Formation.getPublicFormationById",query = "select new com.classscheduler.backend.dto.FormationDTO(f.id,f.title,f.category,f.city,f.nb_hours, f.objective, f.description,f.photo.bytes,f.start_registration,f.end_registration,f.cost,f.slug)" +
          "from Formation f where f.status='ACTIVE' and f.id=:id")
@NamedQuery(name = "Formation.findAllFormation" ,query = "select new com.classscheduler.backend.dto.FormationDTOAdmin(f.id,f.title, f.category, f.city, f.nb_hours, f.objective,f.description,f.status, f.cost,f.capacity,f.photo.bytes ,f.start_registration,f.end_registration,f.slug) FROM  Formation f")
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
    @Column(length = 500000)
    private String objective;
    @Column(length = 500000)
    private String description;
    private String status = "ACTIVE";
    private float cost = 0.00F;
    private int capacity;
    @Column(unique = true)
    private String slug;

    private LocalDate start_registration;
    private LocalDate end_registration;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private ImagesModel photo;

}
