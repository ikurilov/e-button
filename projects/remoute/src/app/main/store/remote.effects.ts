import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { remoteActions } from './remote.actions';
import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionWithImageSlide } from '../../../../../../src/app/modules/editor/state/editor.state';

const API_URL = window.location.origin + '/api';

@Injectable()
export class RemoteEffects {
  constructor(private http: HttpClient, private actions: Actions) {}

  public loadQuestionImages = createEffect(() =>
    this.actions.pipe(
      ofType(remoteActions.imageQuestionMessage),
      switchMap(({ data }) => {
        return this.http
          .get<QuestionWithImageSlide['images']>(`${API_URL}/question-images`)
          .pipe(
            map((images) => {
              return remoteActions.questionImagesLoaded({
                slide: { ...data, images },
              });
            }),
          );
      }),
    ),
  );
}
