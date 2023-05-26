import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pClientActions } from './p-client.actions';
import { from, mergeMap, of, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { PClientUtilsService } from '../services/p-client-utils.service';
import { SocketClientService } from '../services/socket-client.service';
import {
  HostToPlayerMessageType,
  PlayerToHostMessageType,
} from '../../../../../shared/models/socket-messages.model';
import { PlayPhases } from '../../../../../src/app/modules/game-play/store/game-play.state';
import { selectPClient } from './p-client.selectors';
import { PClientPhase } from './p-client.state';

@Injectable()
export class pClientEffects {
  constructor(
    private store: Store,
    private clientUtils: PClientUtilsService,
    private actions: Actions,

    private socket: SocketClientService,
  ) {}

  public initSequence = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.startInitSequence),
      mergeMap(() => {
        return from(this.clientUtils.initSequence()).pipe(
          map((res) => pClientActions.initSequenceCompleted(res)),
        );
      }),
    ),
  );

  public joinHost = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.initSequenceCompleted),
      mergeMap(({ id, name, icon }) => {
        return of(
          pClientActions.sendMessage({
            message: {
              type: PlayerToHostMessageType.JOIN,
              id,
              payload: {
                name,
                icon,
              },
            },
          }),
        );
      }),
    ),
  );

  public sendPong = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.pong),
      withLatestFrom(this.store.select(selectPClient)),
      mergeMap(([_, state]) => {
        return of(
          pClientActions.sendMessage({
            message: {
              type: PlayerToHostMessageType.PONG,
              id: state.id,
              payload: {
                date: new Date(),
              },
            },
          }),
        );
      }),
    ),
  );

  public sendMessage2Host = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.sendMessage),
      mergeMap(({ message }) => {
        this.socket.sendMessageToServer(message);
        return of(pClientActions.ok());
      }),
    ),
  );

  public receiveMessageFromHost = createEffect(() => {
    return this.actions.pipe(
      ofType(pClientActions.receiveMessage),
      mergeMap(({ message }) => {
        console.log(message);
        switch (message.type) {
          case HostToPlayerMessageType.PING: {
            return of(pClientActions.pong());
          }
          case HostToPlayerMessageType.CURRENT_STATE: {
            return of(
              pClientActions.patchState({
                phase: this.mapGamePhaseToPlayerPhase(message.payload.phase),
              }),
            );
          }
          case HostToPlayerMessageType.START_LISTENING: {
            return of(
              pClientActions.startAnswering({
                answeringTeam: message.payload.answeringTeam,
              }),
            );
          }
          case HostToPlayerMessageType.ANSWER_RESULT: {
            return of(
              pClientActions.answerResult({
                result: message.payload.result,
                team: message.payload.team,
              }),
            );
          }
          case HostToPlayerMessageType.UPDATE_ICON: {
            return of(pClientActions.ok());
          }
          case HostToPlayerMessageType.UPDATE_NAME: {
            return of(
              pClientActions.changeName({ name: message.payload.name }),
            );
          }
          case HostToPlayerMessageType.UPDATE_TEAM: {
            return of(
              pClientActions.changeTeam({ team: message.payload.team }),
            );
          }
          case HostToPlayerMessageType.UPDATE_THROTTLE: {
            return of(
              pClientActions.changeThrottle({
                throttle: message.payload.buttonThrottleMS,
              }),
            );
          }
          case HostToPlayerMessageType.SYNC: {
            return of(pClientActions.syncFromHost(message.payload));
          }
          default:
            return of(pClientActions.ok());
        }
      }),
    );
  });

  private mapGamePhaseToPlayerPhase(phase: PlayPhases): PClientPhase {
    switch (phase) {
      case PlayPhases.QUESTION_COUNTDOWN:
      case PlayPhases.QUESTION_ASK:
      case PlayPhases.QUESTION_FIGHT:
        return PClientPhase.ASKING;
      case PlayPhases.QUESTION_LISTENING:
        return PClientPhase.ANSWERING;
      case PlayPhases.QUESTION_VERDICT:
        return PClientPhase.ANSWER_RESULT;
      default:
        return PClientPhase.PAUSE;
    }
  }

  // public changeName = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(pClientActions.changeName),
  //     mergeMap(({ name }) => {
  //       return from(this.pClientService.changeName(name)).pipe(
  //         map(() => pClientActions.changeNameOk({ name })),
  //       );
  //     }),
  //   ),
  // );
  //
  // public changeNameOK = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(pClientActions.changeNameOk),
  //     mergeMap(({ name }) => {
  //       return this.store.select(selectPClient).pipe(
  //         take(1),
  //         map((state) => {
  //           return pClientActions.sendMe({ data: state });
  //         }),
  //       );
  //     }),
  //   ),
  // );
  //
  public changeTeam = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.changeTeam),
      withLatestFrom(this.store.select(selectPClient)),
      mergeMap(([{ team }, state]) => {
        return of(
          pClientActions.sendMessage({
            message: {
              type: PlayerToHostMessageType.UPDATE_TEAM,
              id: state.id,
              payload: {
                team,
              },
            },
          }),
        );
      }),
    ),
  );

  // public sendState = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(pClientActions.sendMe),
  //     mergeMap(() => {
  //       return this.store.select(selectPClient).pipe(
  //         take(1),
  //         map((state) => {
  //           return pClientActions.sendMe({ data: state });
  //         }),
  //       );
  //     }),
  //   ),
  // );
  //
  public pushAnswer = createEffect(() =>
    this.actions.pipe(
      ofType(pClientActions.pushAnswer),
      withLatestFrom(this.store.select(selectPClient)),
      mergeMap(([_, state]) => {
        return of(
          pClientActions.sendMessage({
            message: {
              type: PlayerToHostMessageType.ANSWER_PUSH,
              id: state.id,
              payload: {
                date: new Date(),
              },
            },
          }),
        );
      }),
    ),
  );
  //
  // public sendMeToServer = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(pClientActions.sendMe),
  //     mergeMap(() => {
  //       return this.store.select(selectPClient).pipe(
  //         take(1),
  //         map((state) => {
  //           this.pClientService.sendMessage({
  //             type: 'UPDATE_ME',
  //             data: { name: state.myName, team: state.myTeam, id: state.id },
  //           });
  //           return pClientActions.ok();
  //         }),
  //       );
  //     }),
  //   ),
  // );
}
