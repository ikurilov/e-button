import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorLayoutComponent } from './components/editor-layout/editor-layout.component';
import { InitFolderComponent } from './components/init-folder/init-folder.component';
import { FolderViewerComponent } from './components/folder-viewer/folder-viewer.component';
import { SlidesLineComponent } from './components/slides-line/slides-line.component';
import { SlideEditorComponent } from './components/slide-editor/slide-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { editorReducer } from './state/editor.reducer';
import { EditorEffects } from './state/editor.effects';
import { EffectsModule } from '@ngrx/effects';
import { EditorHeaderPanelComponent } from './components/editor-header-panel/editor-header-panel.component';
import { EditorToolbarComponent } from './components/slide-editor/components/editor-toolbar/editor-toolbar.component';
import { RatioBoxViewerModule } from '../ratio-box-viewer/ratio-box-viewer.module';

@NgModule({
  declarations: [
    EditorLayoutComponent,
    InitFolderComponent,
    FolderViewerComponent,
    SlidesLineComponent,
    SlideEditorComponent,
    EditorHeaderPanelComponent,
    EditorToolbarComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    StoreModule.forFeature('editor', editorReducer),
    EffectsModule.forFeature([EditorEffects]),
    RatioBoxViewerModule,
    ReactiveFormsModule,
  ],
})
export class EditorModule {}
