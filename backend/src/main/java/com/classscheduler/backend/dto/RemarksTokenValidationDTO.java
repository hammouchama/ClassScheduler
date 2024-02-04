package com.classscheduler.backend.dto;

import com.classscheduler.backend.model.Formation;
import com.classscheduler.backend.model.Trainer;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RemarksTokenValidationDTO {
    private Long remarkId;
    private boolean valid;
    private String error;
    private Formation formation;
    private Trainer trainer;
}
