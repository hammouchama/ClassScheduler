import { Formation } from "./formation.model";
import { Trainer } from "./trainer.model";

export interface Remarks {
  id: number;
  note_quality: number;
  note_rythme: number;
  note_support_cours: number;
  note_support_tp: number;
  note_maitrise: number;
  trainer: Trainer;
  formation: Formation;
}
