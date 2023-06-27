import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Fight } from '../../../../../../../src/app/modules/game-play/store/game-play.state';

@Component({
  selector: 'app-question-fight',
  templateUrl: './question-fight.component.html',
  styleUrls: ['./question-fight.component.scss'],
})
export class QuestionFightComponent implements OnInit {
  @Input() public fight: Fight;

  constructor() {}

  ngOnInit(): void {}

  public get pushes() {
    return this.fight.pushes.map((push, index) => {
      return {
        player: push.player,
        time: (
          (+new Date(push.date) - +new Date(this.fight.pushes[0].date)) /
          1000
        ).toFixed(3),
      };
    });
  }
}
