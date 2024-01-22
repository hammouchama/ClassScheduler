import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAreaComponent } from './why-area.component';

describe('WhyAreaComponent', () => {
  let component: WhyAreaComponent;
  let fixture: ComponentFixture<WhyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
