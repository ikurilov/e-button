import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
  ClientMessage,
  ServerMessages,
  SOCKET_EVENT_NAME,
} from '../../../../../models/shared-models';
import {
  pClientToServerMessage,
  serverToPClientMessage,
} from '../../../../../models/message-models';
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
  // public onMessage: EventEmitter<ServerMessages> = new EventEmitter<ServerMessages>();

  constructor(private socket: Socket, private store: Store) {
    console.log('123');
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
