import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SOCKET_EVENT_NAME } from '../../../../../models/shared-models';

import { Store } from '@ngrx/store';
import { pClientActions } from '../state/p-client.actions';
import {
  HostToPlayerMessage,
  PlayerToHostMessage,
} from '../../../../../shared/models/socket-messages.model';

@Injectable({
  providedIn: 'root',
})
export class SocketClientService {
  constructor(private socket: Socket, private store: Store) {
    this.socket
      .fromEvent(SOCKET_EVENT_NAME)
      .subscribe((message: HostToPlayerMessage) => {
        this.store.dispatch(pClientActions.receiveMessage({ message }));
      });
  }

  public sendMessageToServer(message: PlayerToHostMessage): void {
    this.socket.emit(SOCKET_EVENT_NAME, message);
  }
}
