import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {} from '../main/store/remote.state';
import { Store } from '@ngrx/store';
import { remoteActions } from '../main/store/remote.actions';
import {
  HostToScreenMessage,
  PlayerToHostMessageType,
} from '../../../../../shared/models/socket-messages.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteSocketServiceService {
  constructor(private socket: Socket, private store: Store) {
    this.socket
      .fromEvent('message')
      .subscribe((message: HostToScreenMessage) => {
        switch (message.type) {
          case PlayerToHostMessageType.INFO:
            this.store.dispatch(
              remoteActions.infoSlideMessage({
                content: message.payload.content,
              }),
            );
            break;
          case PlayerToHostMessageType.BREAK:
            this.store.dispatch(remoteActions.breakSlideMessage());
            break;
          case PlayerToHostMessageType.RESULT:
            this.store.dispatch(
              remoteActions.resultSlideMessage({ score: message.payload }),
            );
            break;
          case PlayerToHostMessageType.CONNECT_INFO:
            this.store.dispatch(
              remoteActions.connectInfoMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.IMAGE_QUESTION:
            this.store.dispatch(
              remoteActions.imageQuestionMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.COUNTDOWN:
            this.store.dispatch(remoteActions.countdownMessage());
            break;
          case PlayerToHostMessageType.ASK:
            this.store.dispatch(remoteActions.askMessage());
            break;
          case PlayerToHostMessageType.START_FIGHT:
            this.store.dispatch(
              remoteActions.startFightMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.ADD_PLAYER_TO_FIGHT:
            this.store.dispatch(
              remoteActions.addPlayerToFightMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.QUESTION_LISTENING:
            this.store.dispatch(
              remoteActions.questionListeningMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.QUESTION_VERDICT:
            this.store.dispatch(
              remoteActions.questionVerdictMessage({ data: message.payload }),
            );
            break;
          case PlayerToHostMessageType.QUESTION_ANSWER:
            this.store.dispatch(remoteActions.questionAnswerMessage());
            break;
          default:
            break;
        }
      });
  }
}
