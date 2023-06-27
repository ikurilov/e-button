import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentSlideIndex,
  selectPlayPhase,
} from '../../store/game-play.selectors';
import { PlayPhases } from '../../store/game-play.state';
import { take } from 'rxjs';
import { gamePlayActions } from '../../store/game-play.actions';

@Component({
  selector: 'app-lead-buttons',
  templateUrl: './lead-buttons.component.html',
  styleUrls: ['./lead-buttons.component.scss'],
})
export class LeadButtonsComponent implements OnInit {
  selectPhase = this.store.select(selectPlayPhase);
  selectCurrentSlideIndex = this.store.select(selectCurrentSlideIndex);

  phases = PlayPhases;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  answerResult(correct: boolean, delta: number) {
    this.store.dispatch(
      gamePlayActions.answerVerdict({
        result: correct ? 'CORRECT' : 'WRONG',
        delta,
      }),
    );
  }

  askQ(duration: number) {
    this.store.dispatch(gamePlayActions.startCountdown({ duration }));
  }

  showAnswer() {
    this.store.dispatch(gamePlayActions.showAnswer());
  }

  forceScreen() {
    // this.store.dispatch(gamePlayActions.forceScreen());
  }
}
