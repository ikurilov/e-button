import { Injectable, NgZone } from '@angular/core';
import { Server, Socket } from 'socket.io';
import { Store } from '@ngrx/store';
import {
  HostToPlayerMessage,
  HostToPlayerMessageType,
  PlayerToHostMessage,
  PlayerToHostMessageType,
} from '../../../../../shared/models/socket-messages.model';
import { SynchronizationService } from './synchronization.service';
import { playersActions } from '../../../modules/game-play/players-store/players.actions';

@Injectable({
  providedIn: 'root',
})
export class PlayerEntitySocketService {
  private playerSockets: { sInstance: Socket; playerId?: string }[] = [];

  constructor(
    private zone: NgZone,
    private store: Store,
    private syncService: SynchronizationService,
  ) {}

  public startSocket(io: Server): void {
    io.on('connection', (socketInstance: Socket) => {
      let playerSocket = {
        sInstance: socketInstance,
        playerId: null,
      };
      this.zone.run(() => {
        this.playerSockets.push(playerSocket);
      });
      socketInstance.on('message', async (message: PlayerToHostMessage) => {
        console.log('message', message);
        let onPong: (date: Date) => void = null;
        this.zone.run(() => {
          if (!playerSocket.playerId) {
            playerSocket.playerId = message.id;
            // let onPing = () => {
            //   console.log('send ping');
            //   this.sendMessageToPlayer(
            //     { type: HostToPlayerMessageType.PING },
            //     playerSocket.playerId,
            //   );
            // };
            // let onResult = (result) => {
            //   onPong = null;
            //   this.store.dispatch(
            //     playersActions.updatePlayerSyncInfo({
            //       id: playerSocket.playerId,
            //       syncInfo: result,
            //     }),
            //   );
            // };
            // onPong = this.syncService.initSync(10, 10, onPing, onResult).onPong;
          }

          try {
            this.store.dispatch(
              playersActions.playerMessage({
                message,
              }),
            );
          } catch (err) {
            console.error('Error handling player message:', err);
          }
        });
      });

      socketInstance.on('error', (err: any) => {
        console.error('Socket error:', err);
      });

      socketInstance.on('disconnect', () => {
        this.zone.run(() => {
          this.playerSockets = this.playerSockets.filter(
            (s) => s.sInstance.id !== socketInstance.id,
          );
        });
      });
    });
  }

  public sendMessageToAllPlayers(message: HostToPlayerMessage): void {
    this.playerSockets.forEach((s) => {
      s.sInstance.emit('message', message);
    });
  }

  public sendMessageToPlayer(
    message: HostToPlayerMessage,
    playerId: string,
  ): void {
    this.playerSockets.forEach((s) => {
      if (s.playerId === playerId) {
        s.sInstance.emit('message', message);
      }
    });
  }
}
