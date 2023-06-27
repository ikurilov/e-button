import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quesrion-countdown',
  templateUrl: './quesrion-countdown.component.html',
  styleUrls: ['./quesrion-countdown.component.scss'],
})
export class QuesrionCountdownComponent implements OnInit {
  public start = new Date();
  public seconds: string = '0.000';

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.seconds = (
        Math.floor(new Date().getTime() - this.start.getTime()) / 1000
      ).toFixed(3);
    }, 1);
  }
}
