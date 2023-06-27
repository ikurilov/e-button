import { Injectable } from '@angular/core';
import { RemoteSocketService } from '../../../core/services/electron/remote-socket.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { gamePlayActions } from './game-play.actions';
import { delay, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectConfig, selectGamePlay } from './game-play.selectors';
import { PlayPhases } from './game-play.state';

@Injectable()
export class GamePlayEffects {
  constructor(private actions: Actions, private store: Store) {}

  startCountdownAndAskQuestion = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startCountdown),
      withLatestFrom(this.store.select(selectConfig)),
      switchMap(([_, config]) => {
        return of(gamePlayActions.askQuestion()).pipe(
          delay(config.countdownDurationMS),
        );
      }),
    ),
  );

  onPlayerPushedButton = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.playerPushedButton),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([{ player, date }, state]) => {
        if (state.playPhase === PlayPhases.QUESTION_ASK) {
          return of(gamePlayActions.startFight({ player, date }));
        } else if (state.playPhase === PlayPhases.QUESTION_FIGHT) {
          if (
            (state.currentFight?.pushes || []).some(
              (p) => p.player.id === player.id,
            )
          ) {
            return of(gamePlayActions.playerPushedButtonIgnore());
          }
          return of(gamePlayActions.addPlayerToFight({ player, date }));
        } else {
          return of(gamePlayActions.playerPushedButtonIgnore());
        }
      }),
    ),
  );

  onStartFight = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startFight),
      withLatestFrom(this.store.select(selectConfig)),
      mergeMap(([{ player, date }, config]) => {
        return of(gamePlayActions.startListening()).pipe(
          delay(config.fightDurationMS),
        );
      }),
    ),
  );

  onStartListening = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startListening),
      withLatestFrom(this.store.select(selectConfig)),
      mergeMap(([_, config]) => {
        return of(gamePlayActions.listeningTimeOut()).pipe(
          delay(config.listeningDurationMS),
        );
      }),
    ),
  );

  // sendScreenMessage = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(gamePlayActions.sendScreen),
  //     mergeMap(({ data }) => {
  //       this.screen.sendMessage(data);
  //       return of(gamePlayActions.sendScreenOk());
  //     }),
  //   ),
  // );
  //
  // getQPbyPhase(phase: PlayPhases): QuestionPhases {
  //   switch (phase) {
  //     case PlayPhases.QUESTION_TITLE:
  //       return QuestionPhases.TITLE;
  //     case PlayPhases.QUESTION_ASK:
  //       return QuestionPhases.ASK;
  //     case PlayPhases.QUESTION_ANSWER:
  //       return QuestionPhases.ASK;
  //     case PlayPhases.QUESTION_VERDICT:
  //       return QuestionPhases.RESULTS;
  //     case PlayPhases.QUESTION_ANSWER_SHOW:
  //       return QuestionPhases.ANSWER;
  //     default:
  //       debugger;
  //   }
  // }
  //
  // forceScreenUpdate = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(gamePlayActions.forceScreen),
  //     mergeMap(() =>
  //       this.store.select(selectGamePlay).pipe(
  //         // take(1),
  //         map((state) => {
  //           switch (state.currentSlide.type) {
  //             case SlideType.info:
  //               return gamePlayActions.sendScreen({
  //                 data: {
  //                   type: RemoteScreens.INFO,
  //                   payload: state.currentSlide.paragraphs,
  //                 },
  //               });
  //             case SlideType.questionWithImage:
  //               return gamePlayActions.sendScreen({
  //                 data: {
  //                   type: RemoteScreens.QUESTION,
  //                   payload: {
  //                     ...state.currentSlide,
  //                     number:
  //                       state.allGame.slides
  //                         .filter((s) => s.type === SlideType.questionWithImage)
  //                         .indexOf(state.currentSlide) + 1,
  //                     phase: this.getQPbyPhase(state.playPhase),
  //                     answerResult:
  //                       state.playPhase === PlayPhases.QUESTION_VERDICT
  //                         ? state.questionAnswerState.answerResult.type
  //                         : undefined,
  //                     answeringTeam:
  //                       state.playPhase === PlayPhases.QUESTION_VERDICT
  //                         ? state.questionAnswerState.answeringTeam
  //                         : undefined,
  //                   },
  //                 },
  //               });
  //             case SlideType.break:
  //               return gamePlayActions.sendScreen({
  //                 data: {
  //                   type: RemoteScreens.BREAK,
  //                 },
  //               });
  //           }
  //           return gamePlayActions.sendScreenOk();
  //         }),
  //       ),
  //     ),
  //   ),
  // );
  //
  // sendPlayerState = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(
  //       gamePlayActions.showQuestionAnswer,
  //       gamePlayActions.actualizePlayers,
  //       gamePlayActions.playerJoined,
  //       gamePlayActions.playerChangeProps,
  //       gamePlayActions.changeSlide,
  //       gamePlayActions.askQuestion,
  //       // gamePlayActions.answerQuestion,
  //       gamePlayActions.answerVerdict,
  //       gamePlayActions.startDuel,
  //       gamePlayActions.endDuel,
  //     ),
  //     mergeMap(() =>
  //       this.store.select(selectGamePlay).pipe(
  //         take(1),
  //         map((state) => {
  //           // this.pClientService.sendPlayerState(state);
  //           return gamePlayActions.ok();
  //         }),
  //       ),
  //     ),
  //   ),
  // );
}
