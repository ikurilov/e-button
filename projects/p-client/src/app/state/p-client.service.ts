import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VibrationService } from '../services/vibration.service';
import { Store } from '@ngrx/store';
import { pClientActions } from './p-client.actions';
import { ModalEnterNameComponent } from '../components/modal-enter-name/modal-enter-name.component';
import { MessageType, Teams } from '../../../../../models/shared-models';
import { ModalChangeTeamComponent } from '../components/modal-change-team/modal-change-team.component';
import { TeamColors } from '../../../../../src/app/modules/game-play/store/game-play.state';
import { SocketClientService } from '../services/socket-client.service';
import { pClientToServerMessage } from '../../../../../models/message-models';

const CLIENT_ID_KEY = '_uid';
const CLIENT_NAME_KEY = '_name';

@Injectable({
  providedIn: 'root',
})
export class PClientService {
  // TODO: Add next
  // public onAnswerResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private modal: NgbModal,
    private vibrationService: VibrationService,
    private store: Store,
    private socketClientService: SocketClientService,
  ) {
    // this.store.dispatch(pClientActions.init());
  }

  // private async identifyMyself(): Promise<void> {
  //   let uid = localStorage.getItem(CLIENT_ID_KEY);
  //   let myName = localStorage.getItem(CLIENT_NAME_KEY);
  //
  //   if (!myName) {
  //     const mdl = this.modal.open(ModalEnterNameComponent, {
  //       backdrop: 'static',
  //       centered: true,
  //     });
  //     myName = await mdl.result;
  //     localStorage.setItem(CLIENT_NAME_KEY, myName);
  //   }
  //
  //   if (!uid) {
  //     uid = myName + new Date() + Math.random();
  //     localStorage.setItem(CLIENT_ID_KEY, uid);
  //   }
  //
  //   // this.socketService.sendMessage({
  //   //   type: MessageType.MY_ID,
  //   //   date: new Date(),
  //   //   name: myName,
  //   //   clientId: uid,
  //   // });
  // }

  // private getClientId(): string {
  //   return localStorage.getItem(CLIENT_ID_KEY);
  // }

  public async changeName(name): Promise<string> {
    const mdl = this.modal.open(ModalEnterNameComponent, {
      backdrop: 'static',
      centered: true,
    });
    mdl.componentInstance.name = name;
    let myName = await mdl.result;
    localStorage.setItem(CLIENT_NAME_KEY, myName);
    return myName;
  }

  public async changeTeam(): Promise<TeamColors> {
    const mdl = this.modal.open(ModalChangeTeamComponent, {
      backdrop: 'static',
      centered: true,
    });
    // mdl.componentInstance.gameStateSub = this.gameStateSub;
    let newTeam: TeamColors = await mdl.result;
    return newTeam;
    // this.socketService.sendMessage({
    //   date: new Date(),
    //   type: MessageType.JOIN_TEAM,
    //   clientId: this.getClientId(),
    //   team: newTeam,
    // });
  }
}
