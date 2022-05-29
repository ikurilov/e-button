import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAndInfoComponent } from './actions-and-info.component';

describe('ActionsAndInfoComponent', () => {
  let component: ActionsAndInfoComponent;
  let fixture: ComponentFixture<ActionsAndInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsAndInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAndInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
