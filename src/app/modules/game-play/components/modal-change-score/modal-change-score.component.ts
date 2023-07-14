import { Component, Input, OnInit } from '@angular/core';
import { TeamColors } from '../../store/game-play.state';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-change-score',
  templateUrl: './modal-change-score.component.html',
  styleUrls: ['./modal-change-score.component.scss'],
})
export class ModalChangeScoreComponent implements OnInit {
  @Input() score: number;
  @Input() team: TeamColors;
  newScore: number;

  constructor(private mi: NgbActiveModal) {}

  ngOnInit(): void {
    this.newScore = this.score;
  }

  public close(): void {
    this.mi.close();
  }

  public add(number: number) {
    this.newScore += number;
  }

  public save() {
    this.mi.close(this.newScore);
  }
}
