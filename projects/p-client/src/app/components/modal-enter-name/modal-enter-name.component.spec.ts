import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnterNameComponent } from './modal-enter-name.component';

describe('ModalEnterNameComponent', () => {
  let component: ModalEnterNameComponent;
  let fixture: ComponentFixture<ModalEnterNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEnterNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
