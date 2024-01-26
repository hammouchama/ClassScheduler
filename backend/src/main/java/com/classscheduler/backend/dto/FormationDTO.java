package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

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
    private String for_individual;
    private String photo;

    public FormationDTO(Long id, String title, String category, String city, int nb_hours, String objective,
            String description, String for_individual) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
        this.nb_hours = nb_hours;
        this.objective = objective;
        this.description = description;
        this.for_individual = for_individual;
        this.photo = photo;
    }

    public FormationDTO fromFormation(Formation formation) {
        FormationDTO formationDTO = new FormationDTO();
        BeanUtils.copyProperties(formation, formationDTO);
        return formationDTO;
    }
}
