import { ImagesModel } from "./imagesModel.model";

export interface Formation {
  id: number;
  title: string;
  category: string;
  city: string;
  nb_hours: number;
  objective: string;
  description: string;
  status: string;
  for_individual: string;
  cost: number;
  capacity: number;
  photo?: ImagesModel;
}
