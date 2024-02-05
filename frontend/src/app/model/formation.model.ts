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
  cost: number;
  capacity: number;
  photo?: string;
  start_registration: string;
  end_registration: string;
  slug?: string;
}

export const categoryColors: { [key: string]: string } = {
  Development: '#b128ff',
  Design: '#0fa0dd',
  'Data Science': '#30a820',
  Business: '#3b60ff',
  'IT & Software': '#f5a31a',
};

export const cities = ['Tetouan', 'Tanger', 'Casa', 'Rabat'];
