import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionVerdictComponent } from './question-verdict.component';

describe('QuestionVerdictComponent', () => {
  let component: QuestionVerdictComponent;
  let fixture: ComponentFixture<QuestionVerdictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionVerdictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionVerdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
