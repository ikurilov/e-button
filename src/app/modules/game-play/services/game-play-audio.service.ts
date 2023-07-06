import { Injectable } from '@angular/core';
import { first, Observable, take } from 'rxjs';

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

export const memeSounds = [
  'aaa.mp3',
  'beer.mp3',
  'bruh.mp3',
  'butt.mp3',
  'casino.mp3',
  'cyborg.mp3',
  'door.mp3',
  'go away.mp3',
  'mmmm.mp3',
  'po-boshke.mp3',
  'posyobam.mp3',
  'probitie.mp3',
  'selebrate.mp3',
  'sosat.mp3',
  'uuut.mp3',
  'yes-sir.mp3',
];

type SoundEffect = keyof typeof sa;

interface memePlayer {
  audio: HTMLAudioElement;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class GamePlayAudioService {
  public memeSounds: memePlayer[] = memeSounds.map((name) => {
    const audio = new Audio();
    audio.src = assetPath + name;
    audio.load();
    return {
      audio,
      name,
    };
  });

  public systemSounds: memePlayer[] = Object.keys(sa).map((name) => {
    const audio = new Audio();
    audio.src = sa[name];
    audio.load();
    return {
      audio,
      name,
    };
  });

  constructor() {}

  playSoundUntil(soundName: SoundEffect, until: Observable<any>): void {
    const audio = new Audio();
    audio.src = sa[soundName];
    audio.load();
    audio.play();
    until.pipe(take(1)).subscribe(() => {
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
