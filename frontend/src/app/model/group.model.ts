import { Formation } from "./formation.model";

export interface Group {
  id: number;
  groupName: string;
  is_old: boolean;
  formation: Formation;
}
