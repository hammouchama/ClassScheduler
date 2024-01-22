import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatAreaComponent } from './what-area.component';

describe('WhatAreaComponent', () => {
  let component: WhatAreaComponent;
  let fixture: ComponentFixture<WhatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
