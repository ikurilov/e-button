import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlayerEntitySocketService } from '../../../core/services/electron/player-entity-socket.service';
import { gamePlayActions } from '../store/game-play.actions';
import {
  selectConfig,
  selectPlayPhase,
  selectQuestionAnswerState,
} from '../store/game-play.selectors';
import { playersActions } from './players.actions';
import { mergeMap, of, take, withLatestFrom } from 'rxjs';
import {
  HostToPlayerMessageType,
  PlayerToHostMessageType,
} from '../../../../../shared/models/socket-messages.model';
import { selectPlayers } from './players.selectors';
import { map } from 'rxjs/operators';
import { PlayerEntity } from './players.state';

@Injectable()
export class PlayersEffects {
  constructor(
    private actions: Actions,
    private store: Store,
    private playersSocketService: PlayerEntitySocketService,
  ) {}

  sendPhaseToPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(
        gamePlayActions.startCountdown,
        gamePlayActions.askQuestion,
        gamePlayActions.startFight,
        gamePlayActions.answerVerdict,
        gamePlayActions.showAnswer,
        gamePlayActions.changeSlide,
      ),
      withLatestFrom(this.store.select(selectPlayPhase)),
      mergeMap(([_, phase]) => {
        return of(
          playersActions.sendMessage({
            message: {
              type: HostToPlayerMessageType.CURRENT_STATE,
              payload: { phase },
            },
          }),
        );
      }),
    );
  });

  sendStartListeningToPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(gamePlayActions.startListening),
      withLatestFrom(this.store.select(selectQuestionAnswerState)),
      mergeMap(([_, questionAnswerState]) => {
        return of(
          playersActions.sendMessage({
            message: {
              type: HostToPlayerMessageType.START_LISTENING,
              payload: { answeringTeam: questionAnswerState.answeringTeam },
            },
          }),
        );
      }),
    );
  });

  sendAnswerResultToPlayers = createEffect(() => {
    return this.actions.pipe(
      ofType(gamePlayActions.answerVerdict),
      withLatestFrom(this.store.select(selectQuestionAnswerState)),
      mergeMap(([_, questionAnswerState]) => {
        return of(
          playersActions.sendMessage({
            message: {
              type: HostToPlayerMessageType.ANSWER_RESULT,
              payload: {
                team: questionAnswerState.answeringTeam,
                result: questionAnswerState.answerResult.type === 'CORRECT',
              },
            },
          }),
        );
      }),
    );
  });

  sendMessagesToPlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(playersActions.sendMessage),
      mergeMap(({ message, id }) => {
        if (id) {
          this.playersSocketService.sendMessageToPlayer(message, id);
        }
        this.playersSocketService.sendMessageToAllPlayers(message);
        return of(playersActions.sendMessageOk());
      }),
    );
  });

  receiveMessageFromPlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(playersActions.playerMessage),
      mergeMap(({ message }) => {
        console.log(message);
        switch (message.type) {
          case PlayerToHostMessageType.PONG:
            return of(playersActions.ok);
          case PlayerToHostMessageType.JOIN:
            return of(
              playersActions.joinPlayer({
                id: message.id,
                name: message.payload.name,
                icon: message.payload.icon,
                team: message.payload.team,
              }),
            );
          case PlayerToHostMessageType.UPDATE_NAME:
            return of(
              playersActions.updatePlayerName({
                id: message.id,
                name: message.payload.name,
              }),
            );
          case PlayerToHostMessageType.UPDATE_TEAM:
            return of(
              playersActions.updatePlayerTeam({
                id: message.id,
                team: message.payload.team,
              }),
            );
          case PlayerToHostMessageType.UPDATE_ICON:
            return of(
              playersActions.updatePlayerIcon({
                id: message.id,
                icon: message.payload.icon,
              }),
            );
          case PlayerToHostMessageType.ANSWER_PUSH:
            return this.store.select(selectPlayers).pipe(
              take(1),
              map((players: PlayerEntity[]) => {
                const player = players.find((p) => p.id === message.id);
                return gamePlayActions.playerPushedButton({
                  player,
                  date: new Date(),
                  // todo: раскоментить чтобы использовать синхронизацию времени
                  // date: message.payload.date,
                });
              }),
            );
        }
      }),
    );
  });

  createOrOnlinePlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(playersActions.joinPlayer),
      withLatestFrom(this.store.select(selectPlayers)),
      mergeMap(([{ id, name, icon, team }, players]) => {
        const player = players.find((p) => p.id === id);
        if (player) {
          return of(playersActions.updatePlayerOnline({ id, online: true }));
        } else {
          return of(
            playersActions.createPlayer({
              id,
              name,
              icon,
              team,
            }),
          );
        }
      }),
    );
  });

  needToSyncPlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(playersActions.createPlayer, playersActions.updatePlayerOnline),
      mergeMap(({ id }) => {
        return of(playersActions.syncPlayer({ id }));
      }),
    );
  });

  syncPlayer = createEffect(() => {
    return this.actions.pipe(
      ofType(playersActions.syncPlayer),
      withLatestFrom(
        this.store.select(selectPlayers),
        this.store.select(selectConfig),
      ),
      mergeMap(([{ id }, players, config]) => {
        const player = players.find((p) => p.id === id);
        if (player) {
          return of(
            playersActions.sendMessage({
              id,
              message: {
                type: HostToPlayerMessageType.SYNC,
                payload: {
                  throttle: config.buttonThrottleMS,
                  freezeTime: config.freezeTimeMS,
                  teamsInGame: config.availableTeams,
                  myTeam: player.team,
                },
              },
            }),
          );
        }
      }),
    );
  });
}
