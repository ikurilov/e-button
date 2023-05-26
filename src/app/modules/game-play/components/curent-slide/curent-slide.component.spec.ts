import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurentSlideComponent } from './curent-slide.component';

describe('CurentSlideComponent', () => {
  let component: CurentSlideComponent;
  let fixture: ComponentFixture<CurentSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurentSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurentSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
