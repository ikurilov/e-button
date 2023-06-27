import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoundSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';
import { Observable } from 'rxjs';
import {
  selectRemoteScore,
  selectRemoteSlide,
} from '../../store/remote.selectors';
import { TeamColors } from '../../../../../../../src/app/modules/game-play/store/game-play.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.scss'],
})
export class ResultScreenComponent implements OnInit {
  public score: Observable<{ [team in TeamColors]: number }> =
    this.store.select(selectRemoteScore);

  lines = this.score.pipe(
    map((score) => {
      return Object.entries(score)
        .map(([team, score]) => {
          return {
            team,
            score,
          };
        })
        .filter((line) => line.score > 0)
        .sort((a, b) => b.score - a.score);
    }),
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
