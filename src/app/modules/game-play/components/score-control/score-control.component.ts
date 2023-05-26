import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { withLatestFrom } from 'rxjs';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import { map } from 'rxjs/operators';
import { selectConfig, selectTeamScore } from '../../store/game-play.selectors';
import { TeamColors } from '../../store/game-play.state';

@Component({
  selector: 'app-score-control',
  templateUrl: './score-control.component.html',
  styleUrls: ['./score-control.component.scss'],
})
export class ScoreControlComponent implements OnInit {
  public teamColors = TeamColors;

  public score = this.store.select(selectTeamScore);
  public config = this.store.select(selectConfig);

  public displayScore = this.score.pipe(
    withLatestFrom(this.config),
    map(([score, config]) => {
      return config.availableTeams.map((team: TeamColors) => ({
        team,
        score: score[team],
      }));
    }),
  );
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
