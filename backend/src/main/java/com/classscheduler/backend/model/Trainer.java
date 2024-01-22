package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NamedQuery(name = "Trainer.getTrainerNotAccepted",query = "select new com.classscheduler.backend.dto.TrainerDTO(t.id,t.firstName,t.lastName,t.phone,t.address,t.email, t.skills,t.description,t.photo.url,t.formation.title) from Trainer t where t.accepted='false'")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trainer{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String password;

    private String accepted="false";
    private String skills;
    private String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "formation_id")
    private Formation formation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private ImagesModel photo;

}
