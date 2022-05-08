import {
  EventEmitter,
  Injectable,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ClientMessage,
  IMessageJoinTeam,
  MessageType,
  Teams,
} from '../../../models/shared-models';
import { MessagesService } from './messages.service';

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

  constructor(private messagesService: MessagesService) {
    this.startMessageListeners();
  }

  public includeClientInTeam(clientId: string, team: Teams): void {
    const clients = [...this.clients.value];
    clients.find(client => client.id === clientId).team = team;
    this.clients.next(clients);
    this.sendSMS(`You joined ${team} team!`, clientId);
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

  private startMessageListeners(): void {
    this.messagesService.onNewPlayer.subscribe((newPlayerEvent) => {
      this.clients.next([...this.clients.value, { ...newPlayerEvent, online: true, pingMS: -1 }]);
    });
    this.messagesService.onClientGoOnline.subscribe((id) => {
      const clients = [...this.clients.value];
      clients.find(client => client.id === id).online = true;
      this.clients.next(clients);
    });
    this.messagesService.onPlayerGoOffline.subscribe((id) => {
      const clients = [...this.clients.value];
      clients.find(client => client.id === id).online = false;
      this.clients.next(clients);
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
        this.onClientJoinTeam.emit(clientMessage);
      }
    }
  }

}
