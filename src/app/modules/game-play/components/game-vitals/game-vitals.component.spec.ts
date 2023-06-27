import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameVitalsComponent } from './game-vitals.component';

describe('GameVitalsComponent', () => {
  let component: GameVitalsComponent;
  let fixture: ComponentFixture<GameVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
