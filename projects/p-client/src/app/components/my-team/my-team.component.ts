import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TeamColors } from '../../../../../../src/app/modules/game-play/store/game-play.state';
import { selectMyIcon, selectMyTeam } from '../../state/p-client.selectors';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTeamComponent implements OnInit {
  Teams = TeamColors;

  public team = this.store.select(selectMyTeam);
  public icon = this.store.select(selectMyIcon);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  checkTeam() {
    return true;
  }
}
