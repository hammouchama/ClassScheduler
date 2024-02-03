import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Formation, categoryColors } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/-formation.service';

@Component({
  selector: 'app-formation-list-area',
  templateUrl: './formation-list-area.component.html',
  styleUrls: ['./formation-list-area.component.scss'],
})
export class FormationListAreaComponent implements OnInit {
  activeTab: string = 'grid'; // Initial active tab

  collapsedCategories: boolean = false;
  // List of item to collapse

  loading: boolean = true;

  categoryColors: { [key: string]: string } = categoryColors;

  formationData: Formation[] = [];
  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this._fetchData();
    this.loading = false;

    // Condition if the device is mobile
    if (window.innerWidth < 992) {
      this.collapsedCategories = true;
    }
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

  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}



  /* formationData = [
    {
      id: 1,
      formationImage: 'assets/img/formation/formation-1.jpg',
      listImg: 'assets/img/formation/list/formation-1.jpg',
      lesson: '43',
      title: 'Become a product Manager learn the skills & job.',
      rating: '4.5',
      teacherImg: 'assets/img/formation/teacher/teacher-1.jpg',
      teacherName: 'Jim Séchen',
      category: 'Art & Design',
      price: '21.00',
      oldPrice: '33.00',
    },
    {
      id: 2,
      formationImage: 'assets/img/formation/formation-2.jpg',
      listImg: 'assets/img/formation/list/formation-2.jpg',
      lesson: '72',
      title: 'Fundamentals of music theory Learn new',
      rating: '4.0',
      teacherImg: 'assets/img/formation/teacher/teacher-2.jpg',
      teacherName: 'Barry Tone',
      category: 'UX Design',
      price: '32.00',
      oldPrice: '68.00',
      color: 'sky-blue',
    },
    {
      id: 3,
      formationImage: 'assets/img/formation/formation-3.jpg',
      listImg: 'assets/img/formation/list/formation-3.jpg',
      lesson: '35',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.3',
      teacherImg: 'assets/img/formation/teacher/teacher-3.jpg',
      teacherName: 'Samuel Serif',
      category: 'Development',
      price: '13.00',
      oldPrice: '19.00',
      color: 'green',
    },
    {
      id: 4,
      formationImage: 'assets/img/formation/formation-4.jpg',
      listImg: 'assets/img/formation/list/formation-4.jpg',
      lesson: '60',
      title: 'Strategy law and organization Foundation',
      rating: '3.5',
      teacherImg: 'assets/img/formation/teacher/teacher-4.jpg',
      teacherName: 'Elon Gated',
      category: 'Development',
      price: '62.00',
      oldPrice: '97.00',
      color: 'blue',
    },
    {
      id: 5,
      formationImage: 'assets/img/formation/formation-5.jpg',
      listImg: 'assets/img/formation/list/formation-5.jpg',
      lesson: '28',
      title: 'The business Intelligence analyst Formation 2022',
      rating: '4.5',
      teacherImg: 'assets/img/formation/teacher/teacher-5.jpg',
      teacherName: 'Eleanor Fant',
      category: 'Marketing',
      price: '25.00',
      oldPrice: '36.00',
      color: 'orange',
    },
    {
      id: 6,
      formationImage: 'assets/img/formation/formation-6.jpg',
      listImg: 'assets/img/formation/list/formation-6.jpg',
      lesson: '38',
      title: 'Bases Matemáticas dios Álgebra Ecuacion',
      rating: '4.8',
      teacherImg: 'assets/img/formation/teacher/teacher-6.jpg',
      teacherName: 'Brian Cumin',
      category: 'Data Science',
      price: '35.00',
      oldPrice: '46.00',
      color: 'pink',
    },
  ]; */
