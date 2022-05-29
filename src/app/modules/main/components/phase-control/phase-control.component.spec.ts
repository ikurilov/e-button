import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseControlComponent } from './phase-control.component';

describe('PhaseControlComponent', () => {
  let component: PhaseControlComponent;
  let fixture: ComponentFixture<PhaseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
