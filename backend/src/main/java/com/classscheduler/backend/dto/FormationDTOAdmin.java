package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.ImagesModel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class FormationDTOAdmin {
    private Long id;
    private String title;
    private String category;
    private String city;
    private int nb_hours;
    private String objective;
    private String description;
    private String status;
    private float cost;
    private int capacity;
    private byte[] photo;
    private LocalDate start_registration;
    private LocalDate end_registration;
    private String slug;

    public FormationDTOAdmin(Long id, String title, String category, String city, int nb_hours, String objective,
            String description, String status, float cost, int capacity, byte[] photo ,LocalDate start_registration,LocalDate end_registration,String slug) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
        this.nb_hours = nb_hours;
        this.objective = objective;
        this.description = description;
        this.status = status;
        this.cost = cost;
        this.photo = photo;
        this.capacity = capacity;
        this.slug=slug;
        this.start_registration=start_registration;
        this.end_registration=end_registration;


    }
    public static FormationDTOAdmin fromFormatioToFromationDTO(Formation formation){
        FormationDTOAdmin formationDTOAdmin =new FormationDTOAdmin();
        formationDTOAdmin.setId(formation.getId());
        formationDTOAdmin.setTitle(formation.getTitle());
        formationDTOAdmin.setCost(formation.getCost());
        formationDTOAdmin.setCity(formation.getCity());
        formationDTOAdmin.setCategory(formation.getCategory());
        formationDTOAdmin.setObjective(formation.getObjective());
        formationDTOAdmin.setCapacity(formation.getCapacity());
        formationDTOAdmin.setDescription(formation.getDescription());
        formationDTOAdmin.setNb_hours(formation.getNb_hours());
        formationDTOAdmin.setSlug(formation.getSlug());
        formationDTOAdmin.setStatus(formation.getStatus());
        formationDTOAdmin.setStart_registration(formation.getStart_registration());
        formationDTOAdmin.setEnd_registration(formation.getEnd_registration());
        formationDTOAdmin.setPhoto(formation.getPhoto().getBytes());
        return formationDTOAdmin;
    }

}
