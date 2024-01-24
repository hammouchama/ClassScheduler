import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInMainComponent } from './sign-in-main.component';

describe('SignInMainComponent', () => {
  let component: SignInMainComponent;
  let fixture: ComponentFixture<SignInMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
