import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { GamePhaseType, IClientGameState } from '../../../../../../src/app/models/models';
import { Teams } from '../../../../../../models/shared-models';
import { PlayManagerService } from '../../services/play-manager.service';

const ANSWER_RESULT_DURATION = 3000;

@Component({
  selector: 'app-actions-and-info',
  templateUrl: './actions-and-info.component.html',
  styleUrls: ['./actions-and-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsAndInfoComponent implements OnInit {

  GamePhaseType = GamePhaseType;
  Teams = Teams;

  @Input() gameState!: IClientGameState;
  @Output() onPush: EventEmitter<void> = new EventEmitter<void>();
  @Output() onChangeTeam: EventEmitter<void> = new EventEmitter<void>();
  public answerResultRight: boolean;
  public answerResultWrong: boolean;

  constructor(private gs: PlayManagerService, private cdr: ChangeDetectorRef) {
    this.gs.onAnswerResult.subscribe(res => {
      if (res) {
        this.answerResultRight = true;
        setTimeout(() => {
          this.answerResultRight = false;
          this.cdr.detectChanges();
        }, ANSWER_RESULT_DURATION);
      } else {
        this.answerResultWrong = true
        setTimeout(() => {
          this.answerResultWrong = false;
          this.cdr.detectChanges();
        }, ANSWER_RESULT_DURATION < this.gameState.freezeTime * 1000 ? this.gameState.freezeTime * 1000 : ANSWER_RESULT_DURATION);
      }

    })
  }

  public ngOnInit(): void {
  }

  public answer(): void {
    this.onPush.emit();
  }

  public changeTeam(): void {
    this.onChangeTeam.emit();
  }
}
