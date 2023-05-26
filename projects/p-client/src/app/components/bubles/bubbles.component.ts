import { Component, OnInit } from '@angular/core';
import { PlayManagerService } from '../../services/play-manager.service';

export const ANIMATION_DURATION = 5000;

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss'],
})
export class BubblesComponent implements OnInit {
  public bubbles = new Array(25);
  public bubblesLong = new Array(200);
  public wrong: boolean;
  public right: boolean;

  constructor() {}

  ngOnInit(): void {
    // this.ps.onAnswerResult.subscribe(res => {
    //   if (res) {
    //     this.right = true;
    //   } else {
    //     this.wrong = true;
    //   }
    //   setTimeout(() => {
    //     this.right = this.wrong = false;
    //   }, ANIMATION_DURATION)
    // })
  }
}
