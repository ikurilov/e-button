import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFightComponent } from './question-fight.component';

describe('QuestionFightComponent', () => {
  let component: QuestionFightComponent;
  let fixture: ComponentFixture<QuestionFightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionFightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
