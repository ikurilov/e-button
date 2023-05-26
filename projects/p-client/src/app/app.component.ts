import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayManagerService } from './services/play-manager.service';
import { GamePhaseType } from '../../../../src/app/models/models';
import { Teams } from '../../../../models/shared-models';
import { PlayerAudioService } from './services/player-audio.service';
import { Store } from '@ngrx/store';
import { pClientActions } from './state/p-client.actions';
import { selectPClient } from './state/p-client.selectors';
import { SocketClientService } from './services/socket-client.service';

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
  constructor(private store: Store) {
    this.store.dispatch(pClientActions.startInitSequence());
  }

  public changeName(name: string): void {
    this.store.dispatch(pClientActions.changeName({ name }));
    // this.ps.changeName(name).then();
  }

  public changeTeam(): void {
    // this.store.dispatch(pClientActions.changeTeam());
    // this.ps.changeTeam().then()
  }
}
