import { Component, Input, OnInit } from '@angular/core';
import { Teams } from '../../../../../../models/shared-models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IClientGameState } from '../../../../../../src/app/models/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-modal-change-team',
  templateUrl: './modal-change-team.component.html',
  styleUrls: ['./modal-change-team.component.scss']
})
export class ModalChangeTeamComponent implements OnInit {

  @Input() gameStateSub: BehaviorSubject<IClientGameState>;

  constructor(private modalInstance: NgbActiveModal) { }

  ngOnInit(): void {
  }

  selectTeam(team: Teams) {
    this.modalInstance.close(team);
  }
}
