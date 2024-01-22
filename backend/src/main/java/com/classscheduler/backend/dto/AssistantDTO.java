package com.classscheduler.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AssistantDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private String email;
    //private String password;
    private String status;

    public AssistantDTO(Long id, String firstName, String lastName, String phone, String address, String email, String status) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.status = status;
    }
}
