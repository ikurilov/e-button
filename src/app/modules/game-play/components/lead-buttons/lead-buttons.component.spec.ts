import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadButtonsComponent } from './lead-buttons.component';

describe('LeadButtonsComponent', () => {
  let component: LeadButtonsComponent;
  let fixture: ComponentFixture<LeadButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
