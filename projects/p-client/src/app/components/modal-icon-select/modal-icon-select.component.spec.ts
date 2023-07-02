import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIconSelectComponent } from './modal-icon-select.component';

describe('ModalIconSelectComponent', () => {
  let component: ModalIconSelectComponent;
  let fixture: ComponentFixture<ModalIconSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIconSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIconSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
