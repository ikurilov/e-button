import {Injectable} from "@angular/core";
import {EditorService} from "../services/editor.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {editorActions} from "./editor.actions";
import {mergeMap, of, take} from "rxjs";
import {Store} from "@ngrx/store";
import {selectEditor} from "./editor.selectors";
import {EditorState} from "./editor.state";
import {map} from "rxjs/operators";

@Injectable()
export class EditorEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private editorService: EditorService) {
  }



  initFileOrFromFile = createEffect(() => this.actions.pipe(
    ofType(editorActions.setfolder),
    mergeMap(({path}) => {
      return of(editorActions.loadfromfile({state: this.editorService.initFileOrFromFile(path)}));
    }),
  ));

  saveToFile = createEffect(() => this.actions.pipe(
    ofType(editorActions.savetofile),
    mergeMap(() => this.store.select(selectEditor).pipe(
      take(1),
      map(editor => {
          this.editorService.saveToFile(editor as EditorState);
          return editorActions.ok();
        }
      )),
    )
  ));
}
