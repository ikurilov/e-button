import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  GamePlayAudioService,
  sa,
} from '../../services/game-play-audio.service';

@Component({
  selector: 'app-sound-board',
  templateUrl: './sound-board.component.html',
  styleUrls: ['./sound-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoundBoardComponent implements OnInit {
  private sa = sa;

  public systemSounds = this.audioService.systemSounds;
  public memeSounds = this.audioService.memeSounds;

  constructor(private audioService: GamePlayAudioService) {}

  ngOnInit(): void {}

  public get sounds(): string[] {
    return Object.keys(this.sa);
  }

  playOrPause(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play().then();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}
