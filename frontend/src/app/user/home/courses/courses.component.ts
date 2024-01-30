import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/-formation.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // having a list of colors for each category (Development, Design, Data Science, Business, IT & Software)
  categoryColors: { [key: string]: string } = {
    Development: '#b128ff',
    Design: '#0fa0dd',
    'Data Science': '#30a820',
    Business: '#3b60ff',
    'IT & Software': '#f5a31a',
  };
  colors = [
    '#b128ff',
    '#0fa0dd',
    '#30a820',
    '#3b60ff',
    '#f5a31a',
    '#1a8bf5',
    '#b128ff',
    '#fa7919',
    '#f2277e',
  ];

  formationData: Formation[] = [];
  /* formationData: Formation[] = [
    {
      id: 1,
      title: 'TestTitle',
      category: 'Design',
      city: 'Tetouan',
      nb_hours: 12,
      objective: 'fsfsfesf\nsefsefsef',
      description: 'efsfes\nfsef\nsef',
      status: 'ACTIVE',
      cost: 122,
      capacity: 12,
      start_registration: '2024-01-29',
      end_registration: '2024-02-11',
      photo: {
        id: 1,
        name: 'image',
        type: 'image/jpeg',
        url: 'http://localhost:8080/images/formation/1706538372576_diffuse-texture.jpg',
      },
    },
    {
      id: 2,
      title: 'TestTitle2',
      category: 'Development',
      city: 'Tanger',
      nb_hours: 13,
      objective: 'dzqdqzd\nqzdqzdqdqsf',
      description: 'fsef\nsfesfsefsf',
      status: 'ACTIVE',
      cost: 1221210,
      capacity: 1252,
      start_registration: '2024-02-02',
      end_registration: '2024-02-04',
      photo: {
        id: 2,
        name: 'image',
        type: 'image/png',
        url: 'http://localhost:8080/images/formation/1706538432063_2.png',
      },
    },
  ]; */

  courseData = [
    {
      id: 1,
      courseImage: 'assets/img/course/course-1.jpg',
      listImg: 'assets/img/course/list/course_list_1.jpeg',
      nb_hours: '43',
      title: 'Become a product Manager learn the skills & job.',
      rating: '4.5',
      teacherImg: 'assets/img/course/teacher/teacher-1.jpg',
      teacherName: 'Jim Séchen',
      category: 'Art & Design',
      price: '21.00',
      oldPrice: '33.00',
    },
    {
      id: 2,
      courseImage: 'assets/img/course/course-2.jpg',
      listImg: 'assets/img/course/list/course_list_2.jpeg',
      nb_hours: '72',
      title: 'Fundamentals of music theory Learn new',
      rating: '4.0',
      teacherImg: 'assets/img/course/teacher/teacher-2.jpg',
      teacherName: 'Barry Tone',
      category: 'UX Design',
      price: '32.00',
      oldPrice: '68.00',
      color: 'sky-blue',
    },
    {
      id: 3,
      courseImage: 'assets/img/course/course-3.jpg',
      listImg: 'assets/img/course/list/course_list_3.jpeg',
      nb_hours: '35',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.3',
      teacherImg: 'assets/img/course/teacher/teacher-3.jpg',
      teacherName: 'Samuel Serif',
      category: 'Development',
      price: '13.00',
      oldPrice: '19.00',
      color: 'green',
    },
    {
      id: 4,
      courseImage: 'assets/img/course/course-4.jpg',
      listImg: 'assets/img/course/list/course_list_4.jpeg',
      nb_hours: '60',
      title: 'Strategy law and organization Foundation',
      rating: '3.5',
      teacherImg: 'assets/img/course/teacher/teacher-4.jpg',
      teacherName: 'Elon Gated',
      category: 'Development',
      price: '62.00',
      oldPrice: '97.00',
      color: 'blue',
    },
    {
      id: 5,
      courseImage: 'assets/img/course/course-5.jpg',
      listImg: 'assets/img/course/list/course_list_5.jpeg',
      nb_hours: '28',
      title: 'The business Intelligence analyst Course 2022',
      rating: '4.5',
      teacherImg: 'assets/img/course/teacher/teacher-5.jpg',
      teacherName: 'Eleanor Fant',
      category: 'Marketing',
      price: '25.00',
      oldPrice: '36.00',
      color: 'orange',
    },
    {
      id: 6,
      courseImage: 'assets/img/course/course-6.jpg',
      listImg: 'assets/img/course/list/course_list_6.jpeg',
      nb_hours: '38',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.8',
      teacherImg: 'assets/img/course/teacher/teacher-6.jpg',
      teacherName: 'Brian Cumin',
      category: 'Data Science',
      price: '35.00',
      oldPrice: '46.00',
      color: 'pink',
    },
    {
      id: 7,
      courseImage: 'assets/img/course/course-7.jpg',
      listImg: 'assets/img/course/list/course_list_7.jpeg',
      nb_hours: '26',
      title: 'Build your media and Public presence',
      rating: '4.6',
      teacherImg: 'assets/img/course/teacher/teacher-7.jpg',
      teacherName: 'Pelican Steve',
      category: 'Audio & Music',
      price: '46.00',
      oldPrice: '72.00',
      color: 'orange',
    },
    {
      id: 8,
      courseImage: 'assets/img/course/course-8.jpg',
      listImg: 'assets/img/course/list/course_list_8.jpeg',
      nb_hours: '13',
      title: 'Creative writing through Storytelling',
      rating: '4.4',
      teacherImg: 'assets/img/course/teacher/teacher-8.jpg',
      teacherName: 'Shahnewaz Sakil',
      category: 'Mechanical',
      price: '52.00',
      oldPrice: '72.00',
      color: 'pink',
    },
    {
      id: 9,
      courseImage: 'assets/img/course/course-9.jpg',
      listImg: 'assets/img/course/list/course_list_9.jpeg',
      nb_hours: '25',
      title: 'Product Manager Learn the Skills & job.',
      rating: '4.2',
      teacherImg: 'assets/img/course/teacher/teacher-9.jpg',
      teacherName: 'Hilary Ouse',
      category: 'Lifestyle',
      price: '15.00',
      oldPrice: '45.00',
      color: 'blue-2',
    },
  ];
  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this._fetchData();
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.formationService.getAllPublicFormation().subscribe(
      (resp: Formation[]) => {
        this.formationData = resp; // Assign data
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
