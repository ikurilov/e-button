import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { IMessageAnswer, Teams } from '../../../models/shared-models';
import {
  defaultGameConfig,
  defaultGameState,
  defaultPhaseState,
} from '../models/default-states';
import {
  GamePhaseType,
  IClientGameState,
  IGameConfig,
  IGameState,
  IPhaseState,
} from '../models/models';
import { ClientManagerService } from './client-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService, LogType } from './logger.service';

@Injectable({
  providedIn: 'root',
})

//Todo: log on change name and need update
export class GameManagerService {
  public readonly gameConfigSub: BehaviorSubject<IGameConfig> =
    new BehaviorSubject<IGameConfig>(defaultGameConfig);
  public readonly gameStateSub: BehaviorSubject<IGameState> =
    new BehaviorSubject<IGameState>(defaultGameState);
  public readonly phaseSub: BehaviorSubject<IPhaseState> =
    new BehaviorSubject<IPhaseState>(defaultPhaseState);

  public readonly onAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private clientManagerService: ClientManagerService,
    private modal: NgbModal,
    private logger: LoggerService,
  ) {
    this.startMessagesListeners();
    combineLatest([this.phaseSub, this.gameConfigSub]).subscribe(
      ([phase, config]) => {
        let cli: Partial<IClientGameState> =
          GameManagerService.gameStateToClient(phase, config);
        this.clientManagerService.sendClientState(cli);
      },
    );
    this.clientManagerService.onNeedUpdate.subscribe(() => {
      this.clientManagerService.sendClientState(
        GameManagerService.gameStateToClient(
          this.phaseSub.value,
          this.gameConfigSub.value,
        ),
      );
    });
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
        this.clientManagerService.includeClientInTeam(
          message.clientId,
          message.team,
        );
      } else {
        this.clientManagerService.sendSMS(
          'Now it is forbidden to change the team!',
          message.clientId,
        );
      }
    });
    this.clientManagerService.onClientAnswer.subscribe((message) => {
      this.takeAnswer(message);
    });
  }

  private takeAnswer(message: IMessageAnswer): void {
    if (!this.checkAbilityToAnswer(message.clientId)) {
      if (this.phaseSub.value.type === GamePhaseType.ANSWERING) {
        console.log(
          new Date().getMilliseconds(),
          new Date(message.date).getMilliseconds(),
          message.date,
        );
        this.logger.write(LogType.LateForAnswer, [
          this.clientManagerService.clients.value.find(
            (client) => client.id === message.clientId,
          ).name,
        ]);
      }
      return;
    }
    const nextPhase: IPhaseState = { ...this.phaseSub.value };
    nextPhase.type = GamePhaseType.ANSWERING;
    nextPhase.answering = this.clientManagerService.getClientTeam(
      message.clientId,
    );
    this.phaseSub.next(nextPhase);
    this.logger.write(LogType.PlayerAnswer, [
      this.clientManagerService.clients.value.find(
        (client) => client.id === message.clientId,
      ).name,
    ]);
    // отправить что сейчас отвечает
  }

  private checkAbilityToAnswer(clientId: string): boolean {
    // check phase
    if (this.phaseSub.value.type !== GamePhaseType.ASKING) {
      return false;
    }

    const answeringTeam: Teams =
      this.clientManagerService.getClientTeam(clientId);
    if (!answeringTeam) {
      return false;
    }

    // check if it is allowed to answer only once and if the command answered
    if (this.gameConfigSub.value.onlyOneAnswer) {
      return !this.phaseSub.value.alreadyAnswered[answeringTeam];
    }

    //  check if the command answered before the freeze time end;
    if (
      !!this.phaseSub.value.alreadyAnswered[answeringTeam] &&
      this.gameConfigSub.value.wrongAnswerFreezeTimeSec > 0
    ) {
      console.log(
        'freeze Time',
        (+new Date() - +this.phaseSub.value.alreadyAnswered[answeringTeam]) /
          1000 >
          this.gameConfigSub.value.wrongAnswerFreezeTimeSec,
      );
      return (
        (+new Date() - +this.phaseSub.value.alreadyAnswered[answeringTeam]) /
          1000 >
        this.gameConfigSub.value.wrongAnswerFreezeTimeSec
      );
    }

    return true;
  }

  private static gameStateToClient(
    phase: IPhaseState,
    config: IGameConfig,
  ): Partial<IClientGameState> {
    return {
      phaseType: phase.type,
      teamsInGame: config.teams,
      answeringTeam: phase.answering,
      freezeTime: config.wrongAnswerFreezeTimeSec,
    };
  }

  public startQuestion(): void {
    let newPhase: IPhaseState = { ...this.phaseSub.value };
    newPhase.type = GamePhaseType.ASKING;
    this.phaseSub.next(newPhase);
  }

  public skipQuestion(): void {
    let newPhase: IPhaseState = { ...this.phaseSub.value };
    newPhase.alreadyAnswered = {};
    newPhase.type = GamePhaseType.PAUSE;
    this.phaseSub.next(newPhase);
  }

  public answerResult(
    right: boolean,
    continueQuestion: boolean,
    points: number,
  ): void {
    let config: IGameConfig = this.gameConfigSub.value;
    let newPhase: IPhaseState = { ...this.phaseSub.value };
    let newGameState: IGameState = { ...this.gameStateSub.value };
    newGameState.scores[newPhase.answering] =
      (newGameState.scores[newPhase.answering] || 0) + points;
    newPhase.alreadyAnswered[newPhase.answering] = new Date();

    if (
      !continueQuestion ||
      (config.onlyOneAnswer &&
        Object.keys(newPhase.alreadyAnswered).length === config.teams.length)
    ) {
      newPhase.type = GamePhaseType.PAUSE;
      newPhase.alreadyAnswered = {};
    } else {
      newPhase.type = GamePhaseType.ASKING;
    }
    this.clientManagerService.sendAnswerResult(right, newPhase.answering);
    newPhase.answering = null;
    this.gameStateSub.next(newGameState);
    this.phaseSub.next(newPhase);
    this.onAnswer.emit(right);
    this.logger.write(LogType.AnswerResult, [
      right ? 'right' : 'wrong',
      points.toString(),
    ]);
  }

  public shuffleLobby(): void {
    this.clientManagerService.shuffleLobby(this.gameConfigSub.value.teams);
  }

  public editScore(team: Teams, points: number) {
    const mdl = this.modal.open('');
    mdl.componentInstance.team = team;
    mdl.componentInstance.points = points;
    mdl.result.then(
      (res) => {
        if (res) {
          let newGameState: IGameState = { ...this.gameStateSub.value };
          newGameState.scores[team] = res.points;
          this.gameStateSub.next(newGameState);
        }
      },
      () => {},
    );
  }
}
