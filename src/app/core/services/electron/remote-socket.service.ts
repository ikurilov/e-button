import { Injectable, NgZone } from '@angular/core';
import { Server, Socket } from 'socket.io';
import { Store } from '@ngrx/store';
import { HostToScreenMessage } from '../../../../../shared/models/socket-messages.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteSocketService {
  constructor(private zone: NgZone, private store: Store) {}

  screenInstances: Socket[] = [];

  public startSocket(io: Server): void {
    io.on('connection', (socketInstance: Socket) => {
      this.zone.run(() => {
        this.screenInstances.push(socketInstance);
      });

      socketInstance.on('disconnect', () => {
        this.zone.run(() => {
          this.screenInstances = this.screenInstances.filter(
            (s) => s.id !== socketInstance.id,
          );
        });
      });
    });
  }

  public sendMessage(message: HostToScreenMessage): void {
    this.screenInstances.forEach((s) => {
      s.emit('message', message);
    });
  }
}
