import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { EditorState } from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { editorActions } from '../../state/editor.actions';

@Component({
  selector: 'app-folder-viewer',
  templateUrl: './folder-viewer.component.html',
  styleUrls: ['./folder-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderViewerComponent implements OnInit {
  listOfFiles: { fileName: string; url: string }[] = [];

  isHidden = false;

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  constructor(private editorService: EditorService, private store: Store) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      this.listOfFiles = this.editorService.getImagesFromDir(editor.folderPath);
    });
  }

  addSlideWithImage(i: { fileName: string; url: string }) {
    this.store.dispatch(editorActions.addslidewithimage({ imageCoded: i.url }));
    this.isHidden = true;
  }
}
