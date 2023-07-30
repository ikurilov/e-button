import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectConfig, selectGameName } from '../../store/game-play.selectors';
import { ElectronService } from '../../../../core/services';
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
      gamePlayActions.showConnectInfo({ href: 'http://' + this.selectedNet }),
    );
  }

  clearConnectInfo() {
    this.store.dispatch(gamePlayActions.clearConnectInfo());
  }

  copyRemoutScreen() {
    const stringForBuffer = 'http://' + this.selectedNet + ':3001';
    navigator.clipboard.writeText(stringForBuffer);
  }

  copyLocalScreen() {
    const stringForBuffer = 'http://localhost:3001';
    navigator.clipboard.writeText(stringForBuffer);
  }
}
