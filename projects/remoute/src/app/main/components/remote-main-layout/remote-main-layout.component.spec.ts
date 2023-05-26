import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteMainLayoutComponent } from './remote-main-layout.component';

describe('RemoteMainLayoutComponent', () => {
  let component: RemoteMainLayoutComponent;
  let fixture: ComponentFixture<RemoteMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteMainLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
