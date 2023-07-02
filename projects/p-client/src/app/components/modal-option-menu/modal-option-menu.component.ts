import { Component, OnInit } from '@angular/core';
import { playerIcons } from '../../../../../../shared/player-icons/player-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { pClientActions } from '../../state/p-client.actions';

@Component({
  selector: 'app-modal-option-menu',
  templateUrl: './modal-option-menu.component.html',
  styleUrls: ['./modal-option-menu.component.scss'],
})
export class ModalOptionMenuComponent implements OnInit {
  constructor(private modal: NgbActiveModal, private store: Store) {}

  ngOnInit(): void {}

  public changeName() {
    this.store.dispatch(pClientActions.openChangeNameModal());
    this.modal.close();
  }

  public changeTeam() {
    this.store.dispatch(pClientActions.openChangeTeamModal());
    this.modal.close();
  }

  public changeIcon() {
    this.store.dispatch(pClientActions.openChangeIconModal());
    this.modal.close();
  }

  public close() {
    this.modal.close();
  }
}
