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

export const listSkills = [
  // Development
  'Web Development',
  'Mobile App Development',
  'Backend Development',
  'Frontend Development',
  'Full Stack Development',
  'DevOps',

  // Design
  'Graphic Design',
  'UI/UX Design',
  'Web Design',
  'Logo Design',
  'Multimedia Design',
  'Animation',

  // Data Science
  'Machine Learning',
  'Data Analysis',
  'Data Visualization',
  'Artificial Intelligence',
  'Big Data',
  'Predictive Modeling',

  // Business
  'Business Strategy',
  'Marketing',
  'Finance',
  'Entrepreneurship',
  'Project Management',
  'Leadership',

  // IT & Software
  'Network Administration',
  'Cybersecurity',
  'Database Management',
  'Cloud Computing',
  'IT Support',
  'Software Development',
];
