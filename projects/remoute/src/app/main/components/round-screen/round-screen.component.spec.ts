import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundScreenComponent } from './round-screen.component';

describe('RoundScreenComponent', () => {
  let component: RoundScreenComponent;
  let fixture: ComponentFixture<RoundScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
