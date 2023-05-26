import { Injectable } from '@angular/core';

export interface SyncInfo {
  iterations: number;
  delta: number;
  accuracy: number;
}

@Injectable({ providedIn: 'root' })
export class SynchronizationService {
  constructor() {}

  initSync(
    maxIterations: number,
    accuracy: number,
    pingCallback: () => void,
    syncCallback: (result: SyncInfo) => void,
  ): { onPong: (date: Date) => void } {
    console.log('Sync started', maxIterations, accuracy);
    let iteration = 0;
    let delta = 0;
    let accuracyReached = false;
    let onPong: (tc: Date) => void = null;

    const processPing = (tc: Date) => {
      console.log('processPing', iteration, delta, accuracy);
      const th0 = new Date();
      pingCallback();

      const processPong = (tc0: Date) => {
        const th1 = new Date();
        pingCallback();

        const processPing2 = (tc1: Date) => {
          const th2 = new Date();
          pingCallback();

          const rtt = (th2.getTime() - th0.getTime()) / 2;
          const ttx =
            (tc1.getTime() - tc0.getTime() - (th2.getTime() - th1.getTime())) /
            2;
          delta = th0.getTime() - tc0.getTime() + ttx;

          iteration++;
          if (iteration >= maxIterations) {
            accuracyReached = true;
          }

          if (Math.abs(delta) <= accuracy || accuracyReached) {
            console.log('Sync done', iteration, delta, accuracy);
            syncCallback({
              iterations: iteration,
              delta: delta,
              accuracy: accuracy,
            });
          } else {
            processPing(new Date()); // Call processPing again
          }
        };

        processPing2(tc0);
      };

      onPong = (tc0: Date) => {
        processPong(tc0);
      };

      this.onPong(tc);
    };

    processPing(new Date());

    return {
      onPong: (tc: Date) => {
        onPong(tc);
      },
    };
  }

  onPong: (tc: Date) => void = (tc: Date) => {};
}
