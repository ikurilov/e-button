import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditorService, FileListItem } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { EditorState, QuestionWithAudioSlide, QuestionWithImageSlide } from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { editorActions } from '../../state/editor.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-folder-viewer',
  templateUrl: './folder-viewer.component.html',
  styleUrls: ['./folder-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderViewerComponent implements OnInit {
  @ViewChild('audioElement')
  public audioElement: ElementRef;

  public folderPath = this.store.select(selectEditor).pipe(
    map((editor) => {
      return editor?.folderPath;
    }),
  );

  public listOfFiles: FileListItem[] = [];

  currentSlide = this.store.select(selectEditor).pipe(
    map((editor) => {
      if (editor?.slides.length) {
        return editor?.slides[editor.currentSlideIndex];
      }
    }),
  );

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  constructor(private editorService: EditorService, private store: Store) {}

  ngOnInit(): void {
    this.refresh();
  }

  public get filteredFiles(): Observable<FileListItem[]> {
    return this.editorState.pipe(map((editorState) => {

      const imagesFilesPaths = editorState.slides
        .filter((slide) => slide.type === 'questionWithImage')
        .map((slide) => (slide as QuestionWithImageSlide).images)
        .flat()
        .map((image) => image.takenFrom);

      const audioFilesPaths = editorState.slides
        .filter((slide) => slide.type === 'questionWithAudio')
        .map((slide) => (slide as QuestionWithAudioSlide).takenFrom);

      const allFilesPaths = this.listOfFiles
        .map((fileObj) => ({ ...fileObj, isUsed: [...imagesFilesPaths, ...audioFilesPaths].includes(fileObj.path) }));

      return allFilesPaths
        .sort((a, b) =>
        (a.isUsed === b.isUsed ? 0 : a.isUsed ? 1 : -1));
    }));
  }

  refresh() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      this.listOfFiles = this.editorService.getFilesFromDir(editor.folderPath);
    });
  }

  // addSlideWithImage(i: { fileName: string; url: string }) {
  //   this.store.dispatch(editorActions.addslidewithimage({ imageCoded: i.url }));
  // }

  // addFromAllImages() {
  //   this.listOfFiles.forEach((i) => {
  //     this.store.dispatch(
  //       editorActions.addslidewithimage({ imageCoded: i.url }),
  //     );
  //   });
  // }

  createSlideWithImage(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addslidewithimage({
        imageCoded: fileObj.url,
        takenFrom: fileObj.path,
      }),
    );
  }

  addImageToSlide(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addimagetoslide({ imageCoded: fileObj.url }),
    );
  }

  createSlideWithAudio(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addslidewithaudio({ audioCoded: fileObj.url, takenFrom: fileObj.path }),
    );
  }

  public playAudio(event: Event): void {
    this.audioElement.nativeElement.play();
  }
}
