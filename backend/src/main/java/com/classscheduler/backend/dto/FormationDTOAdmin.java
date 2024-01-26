package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.ImagesModel;
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
    private String for_individual;
    private int capacity;
    private ImagesModel photo;

    public FormationDTOAdmin(Long id, String title, String category, String city, int nb_hours, String objective, String description, String status, float cost, String for_individual, int ability, ImagesModel photo) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.city = city;
        this.nb_hours = nb_hours;
        this.objective = objective;
        this.description = description;
        this.status = status;
        this.cost = cost;
        this.for_individual=for_individual;
        this.capacity=ability;
        this.photo=photo;
    }

    public FormationDTOAdmin fromFormation(Formation formation){
        FormationDTOAdmin formationDTO=new FormationDTOAdmin();
        BeanUtils.copyProperties(formation,formationDTO);
        return formationDTO;
    }
}
