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

    public FormationDTOAdmin fromFormation(Formation formation) {
        FormationDTOAdmin formationDTO = new FormationDTOAdmin();
        BeanUtils.copyProperties(formation, formationDTO);
        return formationDTO;
    }
}
