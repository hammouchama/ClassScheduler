package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

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

    public FormationDTOAdmin(Long id, String title, String category, String city, int nb_hours, String objective, String description, String status, float cost) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
        this.nb_hours = nb_hours;
        this.objective = objective;
        this.description = description;
        this.status = status;
        this.cost = cost;
    }

    public FormationDTOAdmin fromFormation(Formation formation){
        FormationDTOAdmin formationDTO=new FormationDTOAdmin();
        BeanUtils.copyProperties(formation,formationDTO);
        return formationDTO;
    }
}
