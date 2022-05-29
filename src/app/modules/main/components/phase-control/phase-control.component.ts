import { Component, OnInit } from '@angular/core';
import { GameManagerService } from '../../../../services/game-manager.service';
import { GamePhaseType } from '../../../../models/models';

@Component({
  selector: 'app-phase-control',
  templateUrl: './phase-control.component.html',
  styleUrls: ['./phase-control.component.scss']
})
export class PhaseControlComponent implements OnInit {
  GamePhaseType = GamePhaseType;

  constructor(public gameService: GameManagerService) {
  }

  public ngOnInit(): void {
  }

  public startQuestion(): void {
    this.gameService.startQuestion()
  }

  public skipQuestion(): void {
    this.gameService.skipQuestion();
  }

  answerResult(right: boolean, continueQuestion: boolean, points: number) {
    this.gameService.answerResult(right, continueQuestion, points);
  }
}
