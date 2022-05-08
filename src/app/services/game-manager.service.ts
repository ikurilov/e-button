import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teams } from '../../../models/shared-models';
import {
  defaultGameConfig,
  defaultGameState,
  defaultPhaseState,
} from '../models/default-states';
import {
  IGameConfig,
  IGameState,
  IPhaseState,
} from '../models/models';
import { ClientManagerService } from './client-manager.service';

@Injectable({
  providedIn: 'root',
})

export class GameManagerService {

  public readonly gameConfigSub: BehaviorSubject<IGameConfig> = new BehaviorSubject<IGameConfig>(defaultGameConfig);
  public readonly gameStateSub: BehaviorSubject<IGameState> = new BehaviorSubject<IGameState>(defaultGameState);
  public readonly phaseSub: BehaviorSubject<IPhaseState> = new BehaviorSubject<IPhaseState>(defaultPhaseState);

  constructor(private clientManagerService: ClientManagerService) {
    this.startMessagesListeners();
  }

  public includePlayerInTeam(clientId: string, team: Teams): void {
    this.clientManagerService.includeClientInTeam(clientId, team);
  }

  public applyGameConfig(config: IGameConfig): void {
    this.gameConfigSub.next(config);
  }

  private startMessagesListeners(): void {
    this.clientManagerService.onClientJoinTeam.subscribe((message) => {
      if (!this.gameConfigSub.value.forbidTeamChanging) {
        this.clientManagerService.includeClientInTeam(message.clientId, message.team);
      } else {
        this.clientManagerService.sendSMS('Now it is forbidden to change the team!', message.clientId);
      }
    });
  }

}
