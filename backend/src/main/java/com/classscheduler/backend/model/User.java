package com.classscheduler.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


//create query
@NamedQuery(name = "User.findAllAssistant",query = "select new com.classscheduler.backend.dto.AssistantDTO(u.id,u.firstName,u.lastName,u.phone, u.address, u.email, u.status) from User u where role='assistant'")

@NamedQuery(name = "findAssistantById" ,query = "select User from User u where u.role='assistant' and u.id=:id")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Users")
@DynamicInsert
@DynamicUpdate
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    private String password;
    private String status;
    private String role;
}
