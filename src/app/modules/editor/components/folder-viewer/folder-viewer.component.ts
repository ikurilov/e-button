import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { EditorState } from '../../state/editor.state';
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
  public folderPath = this.store.select(selectEditor).pipe(
    map((editor) => {
      if (editor?.slides.length) {
        return editor?.folderPath;
      }
    }),
  );

  public listOfFiles: {
    fileName: string;
    url: string;
    type: 'image' | 'audio';
  }[] = [];

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

  refresh() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      this.listOfFiles = this.editorService.getFilesFromDir(editor.folderPath);
    });
  }

  addSlideWithImage(i: { fileName: string; url: string }) {
    this.store.dispatch(editorActions.addslidewithimage({ imageCoded: i.url }));
  }

  // addFromAllImages() {
  //   this.listOfFiles.forEach((i) => {
  //     this.store.dispatch(
  //       editorActions.addslidewithimage({ imageCoded: i.url }),
  //     );
  //   });
  // }

  createSlideWithImage(fileObj: {
    fileName: string;
    url: string;
    type: 'image' | 'audio';
  }) {
    this.store.dispatch(
      editorActions.addslidewithimage({ imageCoded: fileObj.url }),
    );
  }

  addImageToSlide(fileObj: {
    fileName: string;
    url: string;
    type: 'image' | 'audio';
  }) {
    this.store.dispatch(
      editorActions.addimagetoslide({ imageCoded: fileObj.url }),
    );
  }
}
