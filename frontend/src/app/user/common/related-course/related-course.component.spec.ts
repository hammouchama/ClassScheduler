import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedCourseComponent } from './related-course.component';

describe('RelatedCourseComponent', () => {
  let component: RelatedCourseComponent;
  let fixture: ComponentFixture<RelatedCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
