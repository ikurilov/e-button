import { Injectable } from '@angular/core';
import { PlayManagerService } from './play-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerAudioService {
  private audio: HTMLAudioElement;
  paths = [
    'fart.wav',
    'smb_powerup.wav',
  ];

  constructor(public ps: PlayManagerService) {
    this.ps.onAnswerResult.subscribe(res => {
      if (res) {
        this.playSound(this.paths[1])
      } else {
        this.playSound(this.paths[0])
      }
    })
  }

  playSound(fileName: string): void {
    if (this.audio) this.audio.pause();
    this.audio = new Audio();
    this.audio.src = '../../assets/audio/' + fileName;
    this.audio.load();
    this.audio.play();
  }
}
