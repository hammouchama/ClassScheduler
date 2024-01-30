import { Formation } from "./formation.model";

export interface Trainer {
     id: number;
     firstName: string;
     lastName: string;
     phone: string;
     address: string;
     email: string;

     skills: string;
     description: string;

     photo: string;

     formations: Array<Formation>;

}