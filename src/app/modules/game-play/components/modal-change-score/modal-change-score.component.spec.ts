import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeScoreComponent } from './modal-change-score.component';

describe('ModalChangeScoreComponent', () => {
  let component: ModalChangeScoreComponent;
  let fixture: ComponentFixture<ModalChangeScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangeScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
