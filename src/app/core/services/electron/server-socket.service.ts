import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';
import {
  ServerMessages,
  SOCKET_EVENT_NAME,
} from '../../../../../models/shared-models';

@Injectable({
  providedIn: 'root',
})
export class ServerSocketService {
  public readonly onNewConnection: Subject<Socket> = new Subject<Socket>();
  public readonly onClientDisconnect: Subject<Socket> = new Subject<Socket>();
  public readonly onNewMessage: Subject<{
    message: ServerMessages;
    socketInstance: Socket;
  }> = new Subject<{ message: ServerMessages; socketInstance: Socket }>();

  constructor(private zone: NgZone) {}

  public startSocket(io: Server): void {
    io.on('connection', (socketInstance: Socket) => {
      this.zone.run(() => this.onNewConnection.next(socketInstance));

      socketInstance.on(SOCKET_EVENT_NAME, (message: ServerMessages) => {
        this.zone.run(() =>
          this.onNewMessage.next({ message, socketInstance }),
        );
      });
      socketInstance.on('disconnect', () => {
        this.zone.run(() => this.onClientDisconnect.next(socketInstance));
      });
    });
  }

  public sendMessage(message: ServerMessages, socketInstance: Socket): void {
    socketInstance.emit(SOCKET_EVENT_NAME, message);
  }

  // public startScreenSocket(io: Server): void {
  //   io.on('connection', (socketInstance: Socket) => {
  //     // this.zone.run(() => this.onNewConnection.next(socketInstance));
  //
  //     socketInstance.on(SOCKET_EVENT_NAME, (message: ServerMessages) => {
  //       // this.zone.run(() => this.onNewMessage.next({ message, socketInstance }))
  //     });
  //     socketInstance.on('disconnect', () => {
  //       // this.zone.run(() => this.onClientDisconnect.next(socketInstance));
  //     });
  //   });
  // }
}
