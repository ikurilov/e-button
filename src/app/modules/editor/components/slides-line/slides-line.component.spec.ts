import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesLineComponent } from './slides-line.component';

describe('SlidesLineComponent', () => {
  let component: SlidesLineComponent;
  let fixture: ComponentFixture<SlidesLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
