import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IMessageAnswer, Teams } from '../../../models/shared-models';
import { defaultGameConfig, defaultGameState, defaultPhaseState, } from '../models/default-states';
import { GamePhaseType, IClientGameState, IGameConfig, IGameState, IPhaseState, } from '../models/models';
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
    combineLatest([
      this.phaseSub,
      this.gameStateSub,
      this.gameConfigSub,
    ]).subscribe(([phase, state, config]) => {
      let cli: Partial<IClientGameState> = GameManagerService.gameStateToClient(phase, state, config);
      this.clientManagerService.sendClientState(cli);
    })
  }

  public includePlayerInTeam(clientId: string, team: Teams): void {
    this.clientManagerService.includeClientInTeam(clientId, team);
  }

  public applyGameConfig(config: IGameConfig): void {
    this.gameConfigSub.next(config);
  }

  public rateTheAnswer(right: boolean, endRound: boolean, points?: number): void {
    if (points) {
      this.addPoints(points * (right ? 1 : -1), this.phaseSub.value.answering);
    }
    const newPhase: IPhaseState = { ...this.phaseSub.value };
    const answeringTeam: Teams = newPhase.answering;
    newPhase.alreadyAnswered[answeringTeam] = new Date();
    newPhase.answering = null;
    newPhase.type = endRound ? GamePhaseType.PAUSE : newPhase.type;
    this.phaseSub.next(newPhase);
    this.clientManagerService.sendAnswerResult(right, answeringTeam);
  }

  public addPoints(points, team: Teams): void {
    const newState: IGameState = { ...this.gameStateSub.value };
    newState.scores[team] = newState.scores[team] || 0 + points;
    this.gameStateSub.next(newState);
  }


  private startMessagesListeners(): void {
    this.clientManagerService.onClientJoinTeam.subscribe((message) => {
      if (!this.gameConfigSub.value.forbidTeamChanging) {
        this.clientManagerService.includeClientInTeam(message.clientId, message.team);
      } else {
        this.clientManagerService.sendSMS('Now it is forbidden to change the team!', message.clientId);
      }
    });
    this.clientManagerService.onClientAnswer.subscribe((message) => {
      this.takeAnswer(message);
    });
  }

  private takeAnswer(message: IMessageAnswer): void {
    if (!this.checkAbilityToAnswer(message.clientId)) {
      return;
    }
    const nextPhase: IPhaseState = { ...this.phaseSub.value }
    nextPhase.type = GamePhaseType.ANSWERING;
    nextPhase.answering = this.clientManagerService.getClientTeam(message.clientId);
    this.phaseSub.next(nextPhase);
    // отправить что сейчас отвечает
  }

  private checkAbilityToAnswer(clientId: string): boolean {
    // check phase
    if (this.phaseSub.value.type !== GamePhaseType.ASKING) {
      return false;
    }

    const answeringTeam: Teams = this.clientManagerService.getClientTeam(clientId);
    if (!answeringTeam) {
      return false;
    }

    // check if it is allowed to answer only once and if the command answered
    if (this.gameConfigSub.value.onlyOneAnswer) {
      return !!this.phaseSub.value.alreadyAnswered[answeringTeam];
    }

    //  check if the command answered before the freeze time end;
    if (!!this.phaseSub.value.alreadyAnswered[answeringTeam] && this.gameConfigSub.value.wrongAnswerFreezeTimeSec > 0) {
      return (+(new Date()) - +this.phaseSub.value.alreadyAnswered[answeringTeam]) / 1000 > this.gameConfigSub.value.wrongAnswerFreezeTimeSec
    }

    return true;
  }

  private static gameStateToClient(phase: IPhaseState, state: IGameState, config: IGameConfig): Partial<IClientGameState> {
    return {
      phaseType: phase.type,
      teamsInGame: config.teams,
      answeringTeam: phase.answering,
    }
  }

}
