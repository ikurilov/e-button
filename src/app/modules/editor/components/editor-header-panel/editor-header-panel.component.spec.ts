import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHeaderPanelComponent } from './editor-header-panel.component';

describe('EditorHeaderPanelComponent', () => {
  let component: EditorHeaderPanelComponent;
  let fixture: ComponentFixture<EditorHeaderPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorHeaderPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHeaderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
