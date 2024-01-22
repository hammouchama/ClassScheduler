import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Navigation } from "swiper";


SwiperCore.use([Navigation,Autoplay]);

@Component({
  selector: 'app-testimonial-area',
  templateUrl: './testimonial-area.component.html',
  styleUrls: ['./testimonial-area.component.scss']
})
export class TestimonialAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
