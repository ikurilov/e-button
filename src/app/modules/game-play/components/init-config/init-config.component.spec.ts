import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitConfigComponent } from './init-config.component';

describe('InitConfigComponent', () => {
  let component: InitConfigComponent;
  let fixture: ComponentFixture<InitConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
