import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAreaComponent } from './brand-area.component';

describe('BrandAreaComponent', () => {
  let component: BrandAreaComponent;
  let fixture: ComponentFixture<BrandAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
