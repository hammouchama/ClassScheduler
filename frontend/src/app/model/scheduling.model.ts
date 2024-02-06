import { Company } from "./company.model";
import { Formation } from "./formation.model";
import { Trainer } from "./trainer.model";

export interface Scheduling {
  id?: number;
  title: string;
  start_date_time: string;
  end_date_time: string;
  formation?: Formation;
  company?: Company;
  for_company: boolean;
  trainer?: Trainer;
}
