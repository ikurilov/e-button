import { EventEmitter, Injectable, } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { ClientMessage, IMessageAnswer, IMessageJoinTeam, MessageType, Teams, } from '../../../models/shared-models';
import { MessagesService } from './messages.service';
import { IClientGameState } from '../models/models';
import { LoggerService, LogType } from './logger.service';

export interface IClient {
  id: string;
  online: boolean;
  pingMS: number;
  name: string;
  team?: Teams;
}

@Injectable({
  providedIn: 'root',
})
export class ClientManagerService {

  public readonly clients: BehaviorSubject<IClient[]> = new BehaviorSubject<IClient[]>([]);
  public readonly onClientJoinTeam: EventEmitter<IMessageJoinTeam> = new EventEmitter<IMessageJoinTeam>();
  public readonly onClientAnswer: EventEmitter<IMessageAnswer> = new EventEmitter<IMessageAnswer>();
  public readonly onNeedUpdate: EventEmitter<null | string> = new EventEmitter<null | string>();

  constructor(private messagesService: MessagesService,
              private logger: LoggerService) {
    interval(1000).subscribe(() => this.measurePing());

    // this.clients.subscribe(cli => console.log(cli))
    this.startMessageListeners();
  }

  public includeClientInTeam(clientId: string, team: Teams): void {
    const clients = [...this.clients.value];
    let changedClient = clients.find(client => client.id === clientId)
    changedClient.team = team;
    this.clients.next(clients);
    this.onNeedUpdate.emit(clientId);
    this.sendSMS(`You joined ${team} team!`, clientId);
    this.logger.write(LogType.JoinTeam, [changedClient.name, changedClient.team])
  }

  public measurePing(): void {
    this.clients.value
      .filter(client => client.online)
      .forEach(onlineClient => this.messagesService.sendPing(onlineClient.id));
  }

  public sendSMS(text: string, clientId?: string): void {
    const destination: string[] = clientId
      ? [clientId]
      : this.clients.value.map(client => client.id);
    destination.forEach(id => this.messagesService.sendSMS(text, id));
  }

  public sendAnswerResult(result: boolean, team: Teams): void {
    this.clients.value.filter(client => (client.team === team) && client.online).forEach(teamClient => this.messagesService.sendAnswerResult(result, teamClient.id));
  }

  public getClientTeam(clientId): Teams | null {
    return this.clients.value.find((client) => client.id === clientId)?.team || null;
  }

  public sendClientState(state: Partial<IClientGameState>): void {
    this.clients.value.filter(client => client.online).forEach(
      client => {
        this.messagesService.sendClientState(client.id, {
          ...state,
          myName: client.name,
          myTeam: client.team
        } as IClientGameState)
      }
    )
  }

  private startMessageListeners(): void {
    this.messagesService.onNewPlayer.subscribe((newPlayerEvent) => {
      this.clients.next([...this.clients.value, { ...newPlayerEvent, online: true, pingMS: 0 }]);
      this.measurePing();
      this.logger.write(LogType.NewPlayer, [newPlayerEvent.name]);
    });
    this.messagesService.onClientGoOnline.subscribe((id) => {
      const clients = [...this.clients.value];
      let changedClient = clients.find(client => client.id === id)
      changedClient.online = true;
      this.onNeedUpdate.emit(id);
      this.clients.next(clients);
      this.logger.write(LogType.GoOnline, [changedClient.name])
    });
    this.messagesService.onPlayerGoOffline.subscribe((id) => {
      const clients = [...this.clients.value];
      let changedClient = clients.find(client => client.id === id)
      changedClient.online = false;
      this.clients.next(clients);
      this.logger.write(LogType.GoOffline, [changedClient.name])
    });
    this.messagesService.onPingDefined.subscribe(({ id, pingMS }) => {
      const clients = [...this.clients.value];
      clients.find(client => client.id === id).pingMS = pingMS;
      this.clients.next(clients);
    });
    this.messagesService.onClientMessage.subscribe((clientMessage) => {
      this.processClientMessage(clientMessage);
    });
  }

  private processClientMessage(clientMessage: ClientMessage): void {
    switch (clientMessage.type) {
      case MessageType.NEW_NAME: {
        const clients = [...this.clients.value];
        clients.find(client => client.id === clientMessage.clientId).name = clientMessage.name;
        this.clients.next(clients);
        this.sendSMS(`Name changed`, clientMessage.clientId);
        break;
      }
      case MessageType.JOIN_TEAM: {
        this.onNeedUpdate.emit(clientMessage.clientId);
        this.onClientJoinTeam.emit(clientMessage);
        break;
      }
      case MessageType.ANSWER: {
        this.onClientAnswer.emit(clientMessage);
        break;
      }
    }
  }

  public shuffleLobby(teamList: Teams[]): void {
    const clients = [...this.clients.value];
    const lobbyClients = clients.filter((client) => !client.team).sort(() => Math.random() - 0.5);
    lobbyClients.forEach((client, index) => {
      client.team = teamList[index % teamList.length]
    })
    this.clients.next(clients);
    this.onNeedUpdate.emit();
  }
}
