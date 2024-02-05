import { Formation } from "./formation.model";
import { Trainer } from "./trainer.model";

export interface RemarksTokenValidationDTO {
  valid: boolean;
  error: string;
  formation: Formation;
  trainer: Trainer;
}
