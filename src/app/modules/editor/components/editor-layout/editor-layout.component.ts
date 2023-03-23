import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { selectEditor } from '../../state/editor.selectors';
import { map } from 'rxjs/operators';
import { EditorState } from '../../state/editor.state';
import { editorActions } from '../../state/editor.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditorModule } from '../../editor.module';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorLayoutComponent implements OnInit {
  isInited = this.store
    .select(selectEditor)
    .pipe(map((editor) => !!editor?.folderPath));

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);
  gameFolder: string =
    'C:\\Users\\ctbg-computer\\Desktop\\мемные игры\\Тестовая игры';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectEditor).subscribe((editor) => {
      console.log('editor', editor);
    });
  }

  initFolder(path: string) {
    this.store.dispatch(editorActions.setfolder({ path }));
  }

  startEditing() {
    console.log(this.gameFolder);
    this.initFolder(this.gameFolder);
  }
}
