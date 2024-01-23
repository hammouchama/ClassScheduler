package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Trainer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TrainerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;

    private String skills;
    private String description;

    private String photo;

    private String formationName;

    public TrainerDTO(Long id,
                      String firstName,
                      String lastName,
                      String phone,
                      String address,
                      String email,
                      String skills,
                      String description,
                      String photo,
                      String formationName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.skills = skills;
        this.description = description;
        this.photo = photo;
        this.formationName = formationName;
    }
   public static TrainerDTO fromTrainerToTrainerTDO(Trainer trainer){
        TrainerDTO trainerDTO=new TrainerDTO();
        trainerDTO.setFirstName(trainer.getFirstName());
        trainerDTO.setLastName(trainer.getLastName());
        trainerDTO.setId(trainer.getId());
        trainerDTO.setAddress(trainer.getAddress());
        trainerDTO.setPhone(trainer.getPhone());
        trainerDTO.setEmail(trainer.getEmail());
        trainerDTO.setDescription(trainer.getDescription());
        trainerDTO.setSkills(trainer.getSkills());
        trainerDTO.setPhoto(trainer.getPhoto().getUrl());
        trainerDTO.setFormationName(trainer.getFormation().getTitle());
        return trainerDTO;
   }


}
