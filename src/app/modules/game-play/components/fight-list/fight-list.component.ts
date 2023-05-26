import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFightList } from '../../store/game-play.selectors';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrls: ['./fight-list.component.scss'],
})
export class FightListComponent implements OnInit {
  public fightList = this.store.select(selectFightList);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
