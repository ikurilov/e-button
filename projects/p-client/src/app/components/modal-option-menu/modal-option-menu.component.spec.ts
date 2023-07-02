import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOptionMenuComponent } from './modal-option-menu.component';

describe('ModalOptionMenuComponent', () => {
  let component: ModalOptionMenuComponent;
  let fixture: ComponentFixture<ModalOptionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOptionMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
