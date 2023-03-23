import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditorState } from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { map } from 'rxjs/operators';
import { editorActions } from '../../state/editor.actions';

@Component({
  selector: 'app-editor-header-panel',
  templateUrl: './editor-header-panel.component.html',
  styleUrls: ['./editor-header-panel.component.scss'],
})
export class EditorHeaderPanelComponent implements OnInit {
  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  public title = this.editorState.pipe(map((editor) => editor.name));
  constructor(private editorService: EditorService, private store: Store) {}

  ngOnInit(): void {}

  save() {
    this.store.dispatch(editorActions.savetofile());
  }
}
