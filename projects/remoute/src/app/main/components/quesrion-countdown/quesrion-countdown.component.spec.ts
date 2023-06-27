import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesrionCountdownComponent } from './quesrion-countdown.component';

describe('QuesrionCountdownComponent', () => {
  let component: QuesrionCountdownComponent;
  let fixture: ComponentFixture<QuesrionCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuesrionCountdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesrionCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
