import { Injectable } from '@angular/core';
import { GameManagerService } from './game-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: HTMLAudioElement;
  paths = [
    'fart.wav',
    'smb_gameover.wav',
    'smb_powerup.wav',
    'smb_stage_clear.wav',
  ];

  constructor(public gs: GameManagerService) {
    this.gs.onAnswer.subscribe(res => {
      if (res) {
        this.playSound(this.paths[2])
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
