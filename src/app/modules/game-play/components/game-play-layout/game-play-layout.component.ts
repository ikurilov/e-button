import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectConfig, selectGameName } from '../../store/game-play.selectors';
import { ElectronService } from '../../../../core/services';
import { remoteActions } from '../../../../../../projects/remoute/src/app/main/store/remote.actions';
import { gamePlayActions } from '../../store/game-play.actions';

@Component({
  selector: 'app-game-play-layout',
  templateUrl: './game-play-layout.component.html',
  styleUrls: ['./game-play-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePlayLayoutComponent implements OnInit {
  public selectConfig = this.store.select(selectConfig);
  public selectGameName = this.store.select(selectGameName);

  public netList = this.electronService.getIp();

  public selectedNet = null;
  constructor(private store: Store, private electronService: ElectronService) {}

  ngOnInit(): void {}

  selectNet(net: string) {
    this.selectedNet = net;
  }

  sendConnectInfo() {
    this.store.dispatch(
      gamePlayActions.showConnectInfo({ href: this.selectedNet }),
    );
  }

  clearConnectInfo() {
    this.store.dispatch(gamePlayActions.clearConnectInfo());
  }

  copyRemoutScreen() {
    let stringForBuffer = this.selectedNet + ':3001';
    navigator.clipboard.writeText(stringForBuffer);
  }

  copyLocalScreen() {
    let stringForBuffer = 'localhost:3001';
    navigator.clipboard.writeText(stringForBuffer);
  }
}
