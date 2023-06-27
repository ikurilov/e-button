import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGamePlayState } from '../../store/game-play.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-vitals',
  templateUrl: './game-vitals.component.html',
  styleUrls: ['./game-vitals.component.scss'],
})
export class GameVitalsComponent implements OnInit {
  public selectGamePlay = this.store.select(selectGamePlayState);

  public selectVitals = this.selectGamePlay.pipe(
    map((gamePlay) => {
      return {
        phase: gamePlay.playPhase,
        slideIndex: {
          current: gamePlay.currentSlideIndex,
          total: gamePlay.allGame.slides.length - 1,
        },
      };
    }),
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
