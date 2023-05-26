import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakScreenComponent } from './break-screen.component';

describe('BreakScreenComponent', () => {
  let component: BreakScreenComponent;
  let fixture: ComponentFixture<BreakScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
