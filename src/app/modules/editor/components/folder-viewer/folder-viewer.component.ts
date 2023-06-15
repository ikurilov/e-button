import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditorService, FileListItem } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { EditorState } from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { editorActions } from '../../state/editor.actions';
import { map } from 'rxjs/operators';
import { isQuestionWithAudioSlide, isQuestionWithImageSlide } from '../../../../shared/utils/type-guards';

@Component({
  selector: 'app-folder-viewer',
  templateUrl: './folder-viewer.component.html',
  styleUrls: ['./folder-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderViewerComponent implements OnInit {
  public folderPath = this.store.select(selectEditor).pipe(
    map((editor) => editor?.folderPath),
  );

  public currentSlide = this.store.select(selectEditor).pipe(
    map((editor) => {
      if (editor?.slides.length) {
        return editor?.slides[editor.currentSlideIndex];
      }
    }),
  );

  private listOfFiles: FileListItem[] = [];

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  constructor(private editorService: EditorService, private store: Store) {}

  public get filteredFiles(): Observable<FileListItem[]> {
    return this.editorState.pipe(map((editorState) => {
      const slideFilePaths = editorState.slides.reduce((paths: string[], slide) => {
        if (isQuestionWithImageSlide(slide)) {
          slide.images.forEach((image) => paths.push(image.takenFrom));
        }
        if (isQuestionWithAudioSlide(slide)) {
          paths.push(slide.audio.takenFrom);
        }
        return paths;
      }, []);

      return this.listOfFiles
        .map((fileObj) => ({ ...fileObj, isUsed: slideFilePaths.includes(fileObj.path) }))
        .sort((a, b) =>
          (a.isUsed === b.isUsed ? 0 : a.isUsed ? 1 : -1));
    }));
  }

  ngOnInit(): void {
    this.refresh();
  }

  public refresh() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      this.listOfFiles = this.editorService.getFilesFromDir(editor.folderPath);
    });
  }

  public createSlideWithImage(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addslidewithimage({
        imageCoded: fileObj.url,
        takenFrom: fileObj.path,
      }),
    );
  }

  public addImageToSlide(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addimagetoslide({ imageCoded: fileObj.url }),
    );
  }

  public createSlideWithAudio(fileObj: FileListItem) {
    this.store.dispatch(
      editorActions.addslidewithaudio({ audioCoded: fileObj.url, takenFrom: fileObj.path, name: fileObj.fileName }),
    );
  }
}
