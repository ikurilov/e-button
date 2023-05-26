import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectConfig } from '../../store/game-play.selectors';

@Component({
  selector: 'app-game-play-layout',
  templateUrl: './game-play-layout.component.html',
  styleUrls: ['./game-play-layout.component.scss'],
})
export class GamePlayLayoutComponent implements OnInit {
  public selectConfig = this.store.select(selectConfig);
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
