import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Navigation } from "swiper";


SwiperCore.use([Navigation,Autoplay]);

@Component({
  selector: 'app-trustedby-area',
  templateUrl: './trustedby-area.component.html',
  styleUrls: ['./trustedby-area.component.scss']
})
export class TrustedbyAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
