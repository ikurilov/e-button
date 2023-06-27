import { TestBed } from '@angular/core/testing';

import { GamePlayAudioService } from './game-play-audio.service';

describe('GamePlayAudioService', () => {
  let service: GamePlayAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlayAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
