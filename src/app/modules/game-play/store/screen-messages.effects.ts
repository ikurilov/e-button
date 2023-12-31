import { Injectable } from '@angular/core';
import { RemoteSocketService } from '../../../core/services/electron/remote-socket.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { gamePlayActions } from './game-play.actions';
import { mergeMap, of, withLatestFrom } from 'rxjs';
import { selectGamePlay } from './game-play.selectors';
import {
  QuestionWithImageSlide,
  SlideType,
} from '../../editor/state/editor.state';
import { HostToScreenMessageType } from '../../../../../shared/models/socket-messages.model';
import { selectPlayers } from '../players-store/players.selectors';

@Injectable()
export class ScreenMessagesEffects {
  constructor(
    private screen: RemoteSocketService,
    private actions: Actions,
    private store: Store,
  ) {}

  onChangeSlide = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.changeSlide),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([{ slideIndex }, state]) => {
        switch (state.currentSlide.type) {
          case SlideType.info:
            this.screen.sendMessage({
              type: HostToScreenMessageType.INFO,
              payload: {
                content: state.currentSlide.content,
              },
            });
            break;
          case SlideType.break:
            this.screen.sendMessage({
              type: HostToScreenMessageType.BREAK,
            });
            break;
          case SlideType.round:
            this.screen.sendMessage({
              type: HostToScreenMessageType.ROUND,
              payload: {
                number: state.allGame.slides
                  .slice(0, slideIndex + 1)
                  .reduce((acc, curr) => {
                    if (curr.type === SlideType.round) {
                      acc++;
                    }
                    return acc;
                  }, 0),
              },
            });
            break;
          case SlideType.result:
            this.screen.sendMessage({
              type: HostToScreenMessageType.RESULT,
              payload: state.score,
            });
            break;
          case SlideType.questionWithImage:
            this.screen.sendMessage({
              type: HostToScreenMessageType.IMAGE_QUESTION,
              payload: {
                slide: {
                  ...state.currentSlide,
                  images: void 0,
                } as Omit<QuestionWithImageSlide, 'images'>,
                questionNumber: state.allGame.slides
                  .slice(0, slideIndex)
                  .reduce((acc, curr) => {
                    if (curr.type === SlideType.questionWithImage) {
                      acc++;
                    }
                    return acc;
                  }, 1),
              },
            });
            break;
          case SlideType.questionWithAudio:
            // TODO: implement
            break;
        }

        return of(gamePlayActions.ok());
      }),
    ),
  );

  onStartCountdown = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startCountdown),
      mergeMap(() => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.COUNTDOWN,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onAskQuestion = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.askQuestion),
      mergeMap(() => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.ASK,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onStartFight = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startFight),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([{ player, date }, state]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.START_FIGHT,
          payload: state.currentFight,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onAddPlayerToFight = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.addPlayerToFight),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([{ player, date }, state]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.ADD_PLAYER_TO_FIGHT,
          payload: { player, date },
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onStartListening = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.startListening),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([_, state]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.QUESTION_LISTENING,
          payload: state.questionAnswerState,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onQuestionVerDict = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.answerVerdict),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([v, state]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.QUESTION_VERDICT,
          payload: state.questionAnswerState,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onShowAnswer = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.showAnswer),
      withLatestFrom(this.store.select(selectGamePlay)),
      mergeMap(([v, state]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.QUESTION_ANSWER,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onSendConnectInfo = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.showConnectInfo),
      withLatestFrom(this.store.select(selectPlayers)),
      mergeMap(([{ href }, players]) => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.CONNECT_INFO,
          payload: {
            qrCode: href,
            teams: players.reduce((acc, player) => {
              const existingItem = acc.find(
                (item) => item.name === player.team,
              );

              if (existingItem) {
                existingItem.players.push(player);
              } else {
                acc.push({ name: player.team, players: [player.name] });
              }

              return acc;
            }, []),
          },
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );

  onClearConnectInfo = createEffect(() =>
    this.actions.pipe(
      ofType(gamePlayActions.clearConnectInfo),
      mergeMap(() => {
        this.screen.sendMessage({
          type: HostToScreenMessageType.CLEAR_CONNECT_INFO,
        });
        return of(gamePlayActions.ok());
      }),
    ),
  );
}
