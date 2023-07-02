import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Teams } from '../../../../models/shared-models';
import { Store } from '@ngrx/store';
import { pClientActions } from './state/p-client.actions';
import { selectPClient } from './state/p-client.selectors';
import { PClientUtilsService } from './services/p-client-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // GamePhaseType = GamePhaseType;
  Teams = Teams;
  selectPlayerState = this.store.select(selectPClient);
  constructor(private store: Store, private utils: PClientUtilsService) {
    this.store.dispatch(pClientActions.startInitSequence());
  }

  openMenu(): void {
    this.utils.openMenu();
  }

  // public changeTeam(): void {
  //   this.pClientService.changeTeam().then((team) => {
  //     this.store.dispatch(pClientActions.changeTeam({ team }));
  //   });
  // }
}
