import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioBoxViewerComponent } from './ratio-box-viewer.component';

describe('RatioBoxViewerComponent', () => {
  let component: RatioBoxViewerComponent;
  let fixture: ComponentFixture<RatioBoxViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatioBoxViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatioBoxViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
