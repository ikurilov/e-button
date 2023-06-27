import { Injectable } from '@angular/core';
import { RemoteSocketService } from '../../../core/services/electron/remote-socket.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GamePlayAudioService } from '../services/game-play-audio.service';
import { gamePlayActions } from './game-play.actions';
import { selectCurrentSlide, selectGamePlay } from './game-play.selectors';
import { filter, mergeMap, of, withLatestFrom } from 'rxjs';
import { SlideType } from '../../editor/state/editor.state';

@Injectable()
export class GamePlayAudioEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private audio: GamePlayAudioService,
  ) {}

  RoundSlideBackgroundMusic = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.changeSlide),
        withLatestFrom(this.store.select(selectCurrentSlide)),
        filter(([_, slide]) => slide.type === SlideType.round),
        mergeMap(() => {
          this.audio.playSoundUntil(
            'roundPhonk',
            this.actions.pipe(ofType(gamePlayActions.changeSlide)),
          );
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );

  countDownSound = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.startCountdown),
        mergeMap(() => {
          this.audio.playSoundUntil(
            'timer',
            this.actions.pipe(ofType(gamePlayActions.askQuestion)),
          );
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );

  fightSound = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.startFight, gamePlayActions.addPlayerToFight),
        mergeMap(() => {
          this.audio.playSound('fight');
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );

  breakSound = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.changeSlide),
        withLatestFrom(this.store.select(selectCurrentSlide)),
        filter(([_, slide]) => slide.type === SlideType.break),
        mergeMap(() => {
          this.audio.playSound('break');
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );

  AnswerSound = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.answerVerdict),
        mergeMap(({ result }) => {
          if (result === 'WRONG') {
            this.audio.playSound('wrongAnswer');
          } else {
            this.audio.playSound('correctAnswer');
          }
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );

  resultSlideBackgroundMusic = createEffect(
    () =>
      this.actions.pipe(
        ofType(gamePlayActions.changeSlide),
        withLatestFrom(this.store.select(selectCurrentSlide)),
        filter(([_, slide]) => slide.type === SlideType.result),
        mergeMap(() => {
          this.audio.playSoundUntil(
            'result',
            this.actions.pipe(ofType(gamePlayActions.changeSlide)),
          );
          return of(gamePlayActions.ok);
        }),
      ),
    { dispatch: false },
  );
}
