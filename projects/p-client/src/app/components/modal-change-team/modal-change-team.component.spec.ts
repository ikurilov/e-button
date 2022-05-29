import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeTeamComponent } from './modal-change-team.component';

describe('ModalChangeTeamComponent', () => {
  let component: ModalChangeTeamComponent;
  let fixture: ComponentFixture<ModalChangeTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangeTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
