import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistantComponent]
    });
    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
