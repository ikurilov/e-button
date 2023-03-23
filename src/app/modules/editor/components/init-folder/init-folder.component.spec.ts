import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitFolderComponent } from './init-folder.component';

describe('InitFolderComponent', () => {
  let component: InitFolderComponent;
  let fixture: ComponentFixture<InitFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
