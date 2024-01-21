import { Component, Inject, OnInit } from '@angular/core';


import { LAYOUT_VERTICAL, LAYOUT_HORIZONTAL } from './layouts.model';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  // layout related config
  layoutType!: string;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // default settings
    document.body.setAttribute('data-bs-theme', 'light');
    this.layoutType = LAYOUT_VERTICAL;
    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout: string) => {
      this.layoutType = layout;
    });
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    console.log(this.layoutType);
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }
}
