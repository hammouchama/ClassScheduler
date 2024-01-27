import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedbyAreaComponent } from './trustedby-area.component';

describe('TrustedbyAreaComponent', () => {
  let component: TrustedbyAreaComponent;
  let fixture: ComponentFixture<TrustedbyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedbyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedbyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
