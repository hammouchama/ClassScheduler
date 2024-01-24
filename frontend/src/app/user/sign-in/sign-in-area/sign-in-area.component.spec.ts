import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAreaComponent } from './sign-in-area.component';

describe('SignInAreaComponent', () => {
  let component: SignInAreaComponent;
  let fixture: ComponentFixture<SignInAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
