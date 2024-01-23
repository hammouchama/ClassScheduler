package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Formation")
@DynamicInsert
@DynamicUpdate
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String category;
    private Boolean forCompany;
    private String address;
    private Date startingDate;
    private Long nbHours;
    private String objectives;
    private String description;
    private String status;
}
