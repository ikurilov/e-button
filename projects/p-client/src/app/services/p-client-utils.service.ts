import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterNameComponent } from '../components/modal-enter-name/modal-enter-name.component';
import { TeamColors } from '../../../../../src/app/modules/game-play/store/game-play.state';
import { ModalChangeTeamComponent } from '../components/modal-change-team/modal-change-team.component';
import { ModalOptionMenuComponent } from '../components/modal-option-menu/modal-option-menu.component';
import { ModalIconSelectComponent } from '../components/modal-icon-select/modal-icon-select.component';

export const CLIENT_ID_KEY = '_uid';
export const CLIENT_NAME_KEY = '_name';
export const CLIENT_ICON_KEY = '_icon';
export const CLIENT_TEAM_KEY = '_team';
@Injectable({
  providedIn: 'root',
})
export class PClientUtilsService {
  constructor(private modal: NgbModal) {}

  public async initSequence(): Promise<{
    name: string;
    id: string;
    icon?: string;
    team?: TeamColors;
  }> {
    let id = localStorage.getItem(CLIENT_ID_KEY);
    let name = localStorage.getItem(CLIENT_NAME_KEY);
    let icon = localStorage.getItem(CLIENT_ICON_KEY);
    let team = localStorage.getItem(CLIENT_TEAM_KEY) as TeamColors | undefined;

    if (!name) {
      const mdl = this.modal.open(ModalEnterNameComponent, {
        backdrop: 'static',
        centered: true,
      });
      name = await mdl.result;
    }

    if (!id) {
      id = name + new Date() + Math.random();
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return { name, id, icon, team };
  }

  public async changeName(name) {
    const mdl = this.modal.open(ModalEnterNameComponent, {
      backdrop: 'static',
      centered: true,
    });
    mdl.componentInstance.name = name;
  }

  public async changeTeam() {
    const mdl = this.modal.open(ModalChangeTeamComponent, {
      backdrop: 'static',
      centered: true,
    });
  }

  public async changeIcon() {
    const mdl = this.modal.open(ModalIconSelectComponent, {
      backdrop: 'static',
      centered: true,
    });
  }

  openMenu() {
    this.modal.open(ModalOptionMenuComponent, {
      backdrop: 'static',
      centered: true,
    });
  }
}
