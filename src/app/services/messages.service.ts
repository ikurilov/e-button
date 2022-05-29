import { EventEmitter, Injectable, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';
import { ClientMessage, IMessageMyID, IMessagePong, MessageType, ServerMessages, } from '../../../models/shared-models';
import { ServerSocketService } from '../core/services/electron/server-socket.service';
import { IClientGameState } from '../models/models';

interface ISocketClient {
  socketInstance: Socket;
  id: string;
}

@Injectable({
  providedIn: 'root',
})

export class MessagesService {
  public readonly onNewPlayer: EventEmitter<{ name: string, id: string }> = new EventEmitter<{ name: string, id: string }>();
  public readonly onPlayerGoOffline: EventEmitter<string> = new EventEmitter<string>(); // emits client id;
  public readonly onClientGoOnline: EventEmitter<string> = new EventEmitter<string>(); // emits client id;
  public readonly onPingDefined: EventEmitter<{ id: string, pingMS: number }> = new EventEmitter<{ id: string; pingMS: number }>();
  public readonly onClientMessage: EventEmitter<ClientMessage> = new EventEmitter<ClientMessage>();

  private readonly clientConnections: BehaviorSubject<ISocketClient[]> = new BehaviorSubject<ISocketClient[]>([]);
  private readonly pingsObj: { [clientId: string]: Date } = {};

  constructor(private serverSocketService: ServerSocketService) {
    this.clientConnections.subscribe(cli => console.log(cli))
    this.startSocketListeners();
  }

  public sendSMS(text: string, clientId: string) {
    const socketInstance = this.clientConnections.value.find(client => client.id === clientId).socketInstance;
    if (!socketInstance) {
      return;
    }
    this.sendMessage(
      {
        type: MessageType.SMS,
        date: new Date(),
        text,
      },
      socketInstance,
    );
  }

  public sendAnswerResult(result: boolean, clientId: string) {
    const socketInstance = this.clientConnections.value.find(client => client.id === clientId).socketInstance;
    if (!socketInstance) {
      return;
    }
    this.sendMessage(
      {
        type: MessageType.ANSWER_RESULT,
        date: new Date(),
        result,
      },
      socketInstance,
    );
  }

  public sendClientState(clientId: string, state: IClientGameState): void {
    const socketInstance = this.clientConnections.value.find(client => client.id === clientId).socketInstance;
    this.sendMessage({
      type: MessageType.CLIENT_GAME_STATE,
      data: state,
      date: new Date()
    }, socketInstance);
  }

  public sendPing(clientId): void {
    this.serverSocketService.sendMessage(
      {
        type: MessageType.PING,
        date: new Date(),
      },
      this.clientConnections.value.find(client => client.id === clientId).socketInstance,
    );
    this.pingsObj[clientId] = new Date();
  }

  private startSocketListeners(): void {
    this.serverSocketService.onNewConnection.subscribe((socketInstance) => {
      this.sendMessage(
        {
          type: MessageType.WHO_ARE_YOU,
          date: new Date(),
        },
        socketInstance,
      );

    });
    this.serverSocketService.onClientDisconnect.subscribe((socketInstance) => {
      this.clientGoOffline(socketInstance);
    });
    this.serverSocketService.onNewMessage.subscribe(({ message, socketInstance }) => {
      // console.log('new message', message);
      this.processMessage(message, socketInstance);
    });
  }

  private sendMessage(message: ServerMessages, socketInstance: Socket): void {
    this.serverSocketService.sendMessage(message, socketInstance);
  }

  private processMessage(message, socketInstance): void {
    switch (message.type) {
      case MessageType.MY_ID: {
        this.identifyClient(message, socketInstance);
        break;
      }
      case MessageType.PONG: {
        this.getPong(message, socketInstance);
        break;
      }
      case MessageType.NEW_NAME:
      case MessageType.ANSWER:
      case MessageType.JOIN_TEAM: {
        this.forwardMessage(message);
        break;
      }
      default:
        console.log('unknown message', message);
    }
  }

  private identifyClient(message: IMessageMyID, socketInstance: Socket): void {
    let identifiedClient: ISocketClient = this.clientConnections.value.find(client => client.id === message.clientId);
    if (identifiedClient) {
      identifiedClient.socketInstance = socketInstance;
      this.onClientGoOnline.emit(identifiedClient.id);
    } else {
      this.clientConnections.next([...this.clientConnections.value, { id: message.clientId, socketInstance }]);
      this.onNewPlayer.emit({ id: message.clientId, name: message.name });
    }
  }

  private clientGoOffline(socketInstance: Socket): void {
    const offlineClient = this.clientConnections.value.find(client => client.socketInstance === socketInstance);
    offlineClient.socketInstance = null;
    this.onPlayerGoOffline.next(offlineClient.id);
  }


  private getPong(message: IMessagePong, socketInstance: Socket): void {
    if (!this.pingsObj[message.clientId]) {
      return;
    }
    const client = this.clientConnections.value.find(client => client.socketInstance === socketInstance);
    if (client) {
      let pingMS = Math.ceil((+(new Date()) - (+this.pingsObj[message.clientId])) / 2);
      this.onPingDefined.emit({ id: message.clientId, pingMS });
    }
    this.pingsObj[message.clientId] = null;
  }

  private forwardMessage(message: ClientMessage): void {
    this.onClientMessage.emit(message);
  }

}
