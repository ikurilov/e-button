import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { selectEditor } from '../../state/editor.selectors';
import { map } from 'rxjs/operators';
import { EditorState } from '../../state/editor.state';
import { editorActions } from '../../state/editor.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  gameFolder: string = 'C:\\Users\\ctbg-computer\\Desktop\\мемные игры\\тест';
  public gameName: any;
  public mode: 'file' | 'slide' = 'slide';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.startEditing();
  }

  start() {
    this.router.navigate(['/game']);
  }

  save() {
    this.store.dispatch(editorActions.savetofile());
  }

  initFolder(path: string) {
    this.store.dispatch(editorActions.setfolder({ path }));
  }

  startEditing() {
    this.initFolder(this.gameFolder);
  }

  public changeViewMode(mode: 'file' | 'slide') {
    this.mode = mode;
  }
}
