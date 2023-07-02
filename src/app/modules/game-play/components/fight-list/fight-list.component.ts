import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFightList } from '../../store/game-play.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrls: ['./fight-list.component.scss'],
})
export class FightListComponent implements OnInit {
  public fightList = this.store.select(selectFightList).pipe(
    map((fightList) =>
      fightList.map((fight) => {
        return {
          ...fight,
          pushes: fight.pushes.map((push) => {
            return {
              ...push,
              time: (
                (+new Date(push.date) - +new Date(fight.pushes[0].date)) /
                1000
              ).toFixed(3),
            };
          }),
        };
      }),
    ),
  );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
