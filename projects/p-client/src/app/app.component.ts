import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayManagerService } from './services/play-manager.service';
import { GamePhaseType } from '../../../../src/app/models/models';
import { Teams } from '../../../../models/shared-models';
import { PlayerAudioService } from './services/player-audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  GamePhaseType = GamePhaseType;
  Teams = Teams;
  constructor(public ps: PlayManagerService, private audio: PlayerAudioService) {
  }

  public changeName(name: string): void {
    this.ps.changeName(name).then();
  }

  public changeTeam(): void {
    this.ps.changeTeam().then()
  }

  public answer(): void {
    this.ps.answer();
  }
}
