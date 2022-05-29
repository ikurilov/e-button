import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditScoreComponent } from './modal-edit-score.component';

describe('ModalEditScoreComponent', () => {
  let component: ModalEditScoreComponent;
  let fixture: ComponentFixture<ModalEditScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
