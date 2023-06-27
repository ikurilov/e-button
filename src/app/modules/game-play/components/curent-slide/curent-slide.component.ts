import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentSlide,
  selectCurrentSlideIndex,
} from '../../store/game-play.selectors';
import {
  QuestionWithImageSlide,
  Slide,
  SlideType,
} from '../../../editor/state/editor.state';
import { take } from 'rxjs';
import { gamePlayActions } from '../../store/game-play.actions';

@Component({
  selector: 'app-curent-slide',
  templateUrl: './curent-slide.component.html',
  styleUrls: ['./curent-slide.component.scss'],
})
export class CurentSlideComponent implements OnInit {
  selectCurrentSlide = this.store.select(selectCurrentSlide);

  selectCurrentSlideIndex = this.store.select(selectCurrentSlideIndex);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  protected readonly slideTypes = SlideType;

  getCastedSlide(slide: Slide): QuestionWithImageSlide {
    return slide as QuestionWithImageSlide;
  }

  prevSlide() {
    this.selectCurrentSlideIndex.pipe(take(1)).subscribe((index) => {
      if (index > 0) {
        this.store.dispatch(
          gamePlayActions.changeSlide({ slideIndex: index - 1 }),
        );
      }
    });
  }

  nextSlide() {
    this.selectCurrentSlideIndex.pipe(take(1)).subscribe((index) => {
      this.store.dispatch(
        gamePlayActions.changeSlide({ slideIndex: index + 1 }),
      );
    });
  }
}
