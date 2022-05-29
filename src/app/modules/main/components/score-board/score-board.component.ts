import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameManagerService } from '../../../../services/game-manager.service';
import { combineLatestWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Teams } from '../../../../../../models/shared-models';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardComponent implements OnInit {

  constructor(private gameService: GameManagerService) {
  }

  public ngOnInit(): void {

  }

  public get scores(): Observable<{ team: Teams, points: number }[]> {
    return this.gameService.gameStateSub.pipe(combineLatestWith(this.gameService.gameConfigSub), map(
      ([state, config]) => {
        let res = []
        config.teams.forEach(
          team => res.push({ team: team, points: state.scores[team] || 0 })
        )
        return res;
      }
    ))

  }

  public editScore(team: Teams, currentScore: number): void {
    this.gameService.editScore(team, currentScore);
  }

}
