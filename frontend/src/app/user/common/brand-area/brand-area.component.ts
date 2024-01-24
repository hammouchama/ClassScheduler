import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay } from "swiper";

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-brand-area',
  templateUrl: './brand-area.component.html',
  styleUrls: ['./brand-area.component.scss']
})
export class BrandAreaComponent implements OnInit {

  brandData = [
    {
      id: "1",
      img: "assets/img/brand/brand-1.png",
    },
    {
      id: "2",
      img: "assets/img/brand/brand-2.png",
    },
    {
      id: "3",
      img: "assets/img/brand/brand-3.png",
    },
    {
      id: "4",
      img: "assets/img/brand/brand-4.png",
    },
    {
      id: "5",
      img: "assets/img/brand/brand-5.png",
    },
    {
      id: "6",
      img: "assets/img/brand/brand-6.png",
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
