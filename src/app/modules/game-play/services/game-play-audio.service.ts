import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

const assetPath = 'assets/sa/';
export const sa = {
  roundPhonk: assetPath + 'round.mp3',
  timer: assetPath + 'timer.mp3',
  fight: assetPath + 'fight.mp3',
  break: assetPath + 'break.mp3',
  wrongAnswer: assetPath + 'wrong-answer.mp3',
  correctAnswer: assetPath + 'correct-answer.mp3',
  result: assetPath + 'results.mp3',
};

type SoundEffect = keyof typeof sa;

@Injectable({
  providedIn: 'root',
})
export class GamePlayAudioService {
  constructor() {}

  playSoundUntil(soundName: SoundEffect, until: Observable<any>): void {
    const audio = new Audio();
    audio.src = sa[soundName];
    audio.load();
    audio.play();
    until.pipe(first()).subscribe(() => {
      audio.pause();
    });
  }

  playSound(soundName: SoundEffect): void {
    const audio = new Audio();
    audio.src = sa[soundName];
    audio.load();
    audio.play();
  }
}
