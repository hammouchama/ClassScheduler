package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Trainer")
@DynamicInsert
@DynamicUpdate
public class Trainer extends User {
    private Boolean accepted;
    private String skills;
    private String photo;
    private String description;

}
