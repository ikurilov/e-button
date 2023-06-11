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
import { SharedModule } from '../../shared/shared.module';
import { AudioCardComponent } from './components/folder-viewer/components/audio-card/audio-card.component';
import { ImageCardComponent } from './components/folder-viewer/components/image-card/image-card.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { InfoEditorComponent } from './components/slide-editor/components/info-editor/info-editor.component';

@NgModule({
  declarations: [
    EditorLayoutComponent,
    InitFolderComponent,
    FolderViewerComponent,
    SlidesLineComponent,
    SlideEditorComponent,
    EditorHeaderPanelComponent,
    EditorToolbarComponent,
    AudioCardComponent,
    ImageCardComponent,
    InfoEditorComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    StoreModule.forFeature('editor', editorReducer),
    EffectsModule.forFeature([EditorEffects]),
    RatioBoxViewerModule,
    ReactiveFormsModule,
    SharedModule,
    AngularEditorModule,
  ],
})
export class EditorModule {}
