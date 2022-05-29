import { EventEmitter, Injectable } from '@angular/core';
import { SocketClientService } from './socket-client.service';
import { MessageType, ServerMessages, Teams } from '../../../../../models/shared-models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterNameComponent } from '../components/modal-enter-name/modal-enter-name.component';
import { BehaviorSubject } from 'rxjs';
import { GamePhaseType, IClientGameState } from '../../../../../src/app/models/models';
import { ModalChangeTeamComponent } from '../components/modal-change-team/modal-change-team.component';
import { VibrationService } from './vibration.service';

const CLIENT_ID_KEY = '_uid'
const CLIENT_NAME_KEY = '_name'

@Injectable({
  providedIn: 'root'
})
export class PlayManagerService {

  public gameStateSub: BehaviorSubject<IClientGameState> = new BehaviorSubject<IClientGameState>(null);
  public onAnswerResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private socketService: SocketClientService,
              private modal: NgbModal,
              private vibrationService: VibrationService) {
    this.socketService.onMessage.subscribe(message => this.handleSocketMessage(message));
  }

  private handleSocketMessage(message: ServerMessages): void {
    switch (message.type) {
      case MessageType.WHO_ARE_YOU: {
        this.identifyMyself().then();
        break;
      }
      case MessageType.PING: {
        this.socketService.sendMessage({
          type: MessageType.PONG,
          date: new Date(),
          clientId: this.getClientId()
        });
        break;
      }
      case MessageType.CLIENT_GAME_STATE: {
        if (
          this.gameStateSub.value?.phaseType === GamePhaseType.ASKING &&
          message.data?.phaseType === GamePhaseType.ANSWERING &&
          message.data?.answeringTeam === message.data.myTeam) {
          this.vibrationService.shortSignal();
        }
        this.gameStateSub.next(message.data);
        break;
      }
      case MessageType.SMS: {
        break;

      }
      case MessageType.ANSWER_RESULT: {
        this.onAnswerResult.emit(message.result);
        message.result ? this.vibrationService.rightSignal() : this.vibrationService.wrongSignal();
      }
    }
  }

  private async identifyMyself(): Promise<void> {
    let uid = localStorage.getItem(CLIENT_ID_KEY);
    let myName = localStorage.getItem(CLIENT_NAME_KEY);

    if (!myName) {
      const mdl = this.modal.open(ModalEnterNameComponent, { backdrop: 'static', centered: true });
      myName = await mdl.result;
      localStorage.setItem(CLIENT_NAME_KEY, myName);
    }

    if (!uid) {
      uid = myName + new Date() + Math.random();
      localStorage.setItem(CLIENT_ID_KEY, uid);
    }

    this.socketService.sendMessage({
      type: MessageType.MY_ID,
      date: new Date(),
      name: myName,
      clientId: uid
    });

  }

  private getClientId(): string {
    return localStorage.getItem(CLIENT_ID_KEY);
  }

  public async changeName(name) {
    const mdl = this.modal.open(ModalEnterNameComponent, { backdrop: 'static', centered: true });
    mdl.componentInstance.name = name
    let myName = await mdl.result;
    localStorage.setItem(CLIENT_NAME_KEY, myName);
    this.socketService.sendMessage({
      date: new Date(),
      type: MessageType.NEW_NAME,
      name: myName,
      clientId: this.getClientId()
    })
  }

  public async changeTeam() {
    const mdl = this.modal.open(ModalChangeTeamComponent, { backdrop: 'static', centered: true });
    mdl.componentInstance.gameStateSub = this.gameStateSub;
    let newTeam: Teams = await mdl.result;

    this.socketService.sendMessage({
      date: new Date(),
      type: MessageType.JOIN_TEAM,
      clientId: this.getClientId(),
      team: newTeam,
    })
  }

  public answer(): void {
    this.socketService.sendMessage({
      type: MessageType.ANSWER,
      date: new Date(),
      clientId: this.getClientId()
    })
  }
}
