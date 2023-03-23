import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderViewerComponent } from './folder-viewer.component';

describe('FolderViewerComponent', () => {
  let component: FolderViewerComponent;
  let fixture: ComponentFixture<FolderViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
