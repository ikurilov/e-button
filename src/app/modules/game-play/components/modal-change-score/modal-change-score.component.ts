import { Component, Input, OnInit } from '@angular/core';
import { TeamColors } from '../../store/game-play.state';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-modal-change-score',
  templateUrl: './modal-change-score.component.html',
  styleUrls: ['./modal-change-score.component.scss'],
})
export class ModalChangeScoreComponent implements OnInit {
  @Input() score: number;
  @Input() team: TeamColors;

  public control = new FormControl();

  constructor(private mi: NgbActiveModal) {}

  ngOnInit(): void {
    this.control.setValue(this.score);
  }

  public close(): void {
    this.mi.close();
  }

  public add(number: number) {
    const currentValue = parseFloat(this.control.value) || 0;

    this.control.setValue(currentValue + number);
  }

  public save() {
    this.mi.close(parseFloat(this.control.value) || undefined);
  }
}
