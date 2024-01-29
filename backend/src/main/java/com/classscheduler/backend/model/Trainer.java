package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NamedQuery(name = "Trainer.getTrainerNotAccepted", query = "select new com.classscheduler.backend.dto.TrainerDTO(t.id,t.firstName,t.lastName,t.phone,t.address,t.email, t.skills,t.description,t.photo.url,t.formation) from Trainer t where t.accepted='false'")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String password;

    private String accepted = "false";
    private String skills;
    private String description;

    @ManyToMany
    //@JoinColumn(name = "formation_id")
    private List<Formation> formation=new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private ImagesModel photo;

}
