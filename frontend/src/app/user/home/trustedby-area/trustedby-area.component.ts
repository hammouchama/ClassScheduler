import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Navigation } from "swiper";


SwiperCore.use([Navigation,Autoplay]);

@Component({
  selector: 'app-trustedby-area',
  templateUrl: './trustedby-area.component.html',
  styleUrls: ['./trustedby-area.component.scss'],
})
export class TrustedbyAreaComponent implements OnInit {
  companyLogos = [
    { src: 'assets/img/companies/Cisco.png', alt: 'Cisco' },
    { src: 'assets/img/companies/Hasbro.png', alt: 'Hasbro' },
    { src: 'assets/img/companies/hubspot.png', alt: 'Hubspot' },
    { src: 'assets/img/companies/kraft.png', alt: 'Kraft' },
    { src: 'assets/img/companies/Nvidia.png', alt: 'Nvidia' },
    { src: 'assets/img/companies/xerox.png', alt: 'Xerox' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
