import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
  QuestionWithImageState,
  RemoteScreens,
} from '../main/store/remote.state';
import { Store } from '@ngrx/store';
import { remoteActions } from '../main/store/remote.actions';
import { HostToScreenMessage } from '../../../../../shared/models/socket-messages.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteSocketServiceService {
  constructor(private socket: Socket, private store: Store) {
    this.socket
      .fromEvent('message')
      .subscribe((message: HostToScreenMessage) => {
        switch (message.type) {
          case RemoteScreens.BREAK:
            this.store.dispatch(remoteActions.setBreak());
            break;
          case RemoteScreens.CONNECT:
            this.store.dispatch(
              remoteActions.setConnect({ data: message.payload }),
            );
            break;
          case RemoteScreens.INFO:
            this.store.dispatch(
              remoteActions.setInfo({ data: message.payload }),
            );
            break;
          case RemoteScreens.QUESTION:
            this.store.dispatch(
              remoteActions.setImageQuestion({ data: message.payload }),
            );
            break;
        }
      });
  }
}
