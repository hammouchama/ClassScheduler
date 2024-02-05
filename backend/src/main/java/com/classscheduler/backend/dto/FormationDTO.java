package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.ImagesModel;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class FormationDTO {
    private Long id;
    private String title;
    private String category;
    private String city;
    private int nb_hours;
    private String objective;
    private String description;
    private byte[] photo;
    @Column(unique = true)
    private String slug;
    private float cost;
    private LocalDate start_registration;
    private LocalDate end_registration;

    public FormationDTO(Long id, String title, String category, String city, int nb_hours, String objective,
            String description,byte[] photo,LocalDate start_registration ,LocalDate end_registration, float cost, String slug) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
        this.nb_hours = nb_hours;
        this.objective = objective;
        this.description = description;
        this.photo = photo;
        this.start_registration=start_registration;
        this.end_registration=end_registration;
        this.cost = cost;
        this.slug = slug;
    }

    public FormationDTO fromFormation(Formation formation) {
        FormationDTO formationDTO = new FormationDTO();
        BeanUtils.copyProperties(formation, formationDTO);
        return formationDTO;
    }
}
