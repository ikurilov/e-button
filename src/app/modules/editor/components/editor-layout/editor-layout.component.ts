import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { selectEditor } from '../../state/editor.selectors';
import { map } from 'rxjs/operators';
import { EditorState } from '../../state/editor.state';
import { editorActions } from '../../state/editor.actions';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorLayoutComponent implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  isInited = this.store
    .select(selectEditor)
    .pipe(map((editor) => !!editor?.folderPath));

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  private gameName: Observable<string> = this.editorState.pipe(
    map((editor) => editor.name),
  );
  gameFolder: string = 'C:\\Users\\ctbg-computer\\Desktop\\мемные игры\\тест';
  // gameFolder: string = '';
  public mode: 'file' | 'slide' = 'slide';

  gameNameControl: FormControl = new FormControl();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.gameName.pipe(takeUntil(this.destroy$)).subscribe((name) => {
      this.gameNameControl.setValue(name, { emitEvent: false });
    });

    this.gameNameControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((name) => {
        this.store.dispatch(editorActions.setname({ name }));
      });
    this.startEditing();
    setTimeout(() => {
      this.router.navigate(['/game']);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
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
