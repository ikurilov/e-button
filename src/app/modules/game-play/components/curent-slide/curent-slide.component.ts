import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentSlide } from '../../store/game-play.selectors';

@Component({
  selector: 'app-curent-slide',
  templateUrl: './curent-slide.component.html',
  styleUrls: ['./curent-slide.component.scss'],
})
export class CurentSlideComponent implements OnInit {
  selectCurrentSlide = this.store.select(selectCurrentSlide);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
