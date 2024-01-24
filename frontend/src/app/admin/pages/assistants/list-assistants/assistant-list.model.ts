// Table data

import { Assistant } from "src/app/model/assistant.model";

/* export interface Table {
  name: string;
  position: string;
  office: string;
  age: number;
  date: string;
  salary: string;
  unit: number;
  enddate: string;
} */

// Search Data
export interface SearchResult {
  tables: Assistant[];
  total: number;
}
