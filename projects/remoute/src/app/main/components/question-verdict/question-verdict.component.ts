import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GamePlayState } from '../../../../../../../src/app/modules/game-play/store/game-play.state';

@Component({
  selector: 'app-question-verdict',
  templateUrl: './question-verdict.component.html',
  styleUrls: ['./question-verdict.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionVerdictComponent implements OnInit {
  @Input() public questionAnswerState: GamePlayState['questionAnswerState'];

  constructor() {}

  ngOnInit(): void {}
}
