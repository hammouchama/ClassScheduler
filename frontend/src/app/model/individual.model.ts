import { Group } from "./group.model";

export interface Individual {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  birth_date: Date;
  group: Group;
}
