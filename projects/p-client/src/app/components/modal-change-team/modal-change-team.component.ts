import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TeamColors } from '../../../../../../src/app/modules/game-play/store/game-play.state';
import { selectTeamsInGame } from '../../state/p-client.selectors';
import { CLIENT_TEAM_KEY } from '../../services/p-client-utils.service';
import { pClientActions } from '../../state/p-client.actions';

@Component({
  selector: 'app-modal-change-team',
  templateUrl: './modal-change-team.component.html',
  styleUrls: ['./modal-change-team.component.scss'],
})
export class ModalChangeTeamComponent implements OnInit {
  public availableTeams = this.store.select(selectTeamsInGame);
  constructor(private modalInstance: NgbActiveModal, private store: Store) {}

  ngOnInit(): void {}

  selectTeam(team: TeamColors) {
    localStorage.setItem(CLIENT_TEAM_KEY, team);
    this.store.dispatch(pClientActions.changeTeam({ team }));
    this.modalInstance.close();
  }
}
