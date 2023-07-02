import { Component, OnInit } from '@angular/core';
import { sa } from '../../services/game-play-audio.service';

@Component({
  selector: 'app-sound-board',
  templateUrl: './sound-board.component.html',
  styleUrls: ['./sound-board.component.scss'],
})
export class SoundBoardComponent implements OnInit {
  private sa = sa;

  constructor() {}

  ngOnInit(): void {}

  public get sounds(): string[] {
    return Object.keys(this.sa);
  }
}
