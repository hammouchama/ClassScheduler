import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cl } from '@fullcalendar/core/internal-common';
import { Formation, categoryColors } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/service/-formation.service';
// import Swiper core and required modules
import SwiperCore, { Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Autoplay])

@Component({
  selector: 'app-formation-details-area',
  templateUrl: './formation-details-area.component.html',
  styleUrls: ['./formation-details-area.component.scss'],
})
export class FormationDetailsAreaComponent implements OnInit {
  formation!: Formation;
  formationSlug: String = '';
  isInrolle: boolean = true
  // For the price card
  isSticky: boolean = false;

  categoryColors: { [key: string]: string } = categoryColors;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSlug();
    if (this.formationSlug && this.formationSlug.length > 0) {
      this.getFormationBySlug(this.formationSlug);
    }
  }

  //get slug from the url
  public getSlug() {
    this.route.paramMap.subscribe((params) => {
      this.formationSlug = params.get('slug') || '';
    });
  }

  //get assistant details
  public async getFormationBySlug(slug: String) {
    console.log('slug', slug);
    this.formationService.getPublicFormationBySlug(slug).subscribe(
      (resp: Formation) => {
        resp.photo = 'data:image/jpeg;base64,' + resp.photo
        console.log('resp', resp);
        this.formation = resp;
        console.log(this.formation.end_registration)
        if (new Date() > new Date(this.formation.end_registration)) {
          this.isInrolle = false
        }
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
      }
    );
  }


  // For the price card
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    // if not mobile
    if (window.innerWidth > 991) {
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isSticky = scrollPosition > 200; // Adjust this value based on when you want the right block to stick
    }
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
  ]; */
