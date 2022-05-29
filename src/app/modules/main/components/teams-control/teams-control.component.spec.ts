import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsControlComponent } from './teams-control.component';

describe('TeamsControlComponent', () => {
  let component: TeamsControlComponent;
  let fixture: ComponentFixture<TeamsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
