import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ClientMessage, ServerMessages, SOCKET_EVENT_NAME } from '../../../../../models/shared-models';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService {

  public onMessage: EventEmitter<ServerMessages> = new EventEmitter<ServerMessages>();

  constructor(private socket: Socket) {
    this.socket.fromEvent(SOCKET_EVENT_NAME).subscribe((message: ServerMessages) => {
      this.onMessage.emit(message)
    });
  }

  public sendMessage(message: ClientMessage): void {
    this.socket.emit(SOCKET_EVENT_NAME, message);
  }


}
