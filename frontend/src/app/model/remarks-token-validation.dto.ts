import { Formation } from "./formation.model";
import { Trainer } from "./trainer.model";

export interface RemarksTokenValidationDTO {
  id: number;
  valid: boolean;
  error: string;
  formation: Formation;
  trainer: Trainer;
}
