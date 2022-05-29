import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VibrationService {

  constructor() { }

  public shortSignal(): void {
    try {
      window.navigator.vibrate([350]);
    } catch (e) {

    }

  }

  public wrongSignal(): void {
    try {
      window.navigator.vibrate([50, 100, 50, 100, 50, 100, 50, 100, 50]);
    } catch (e) {

    }

  }

  public rightSignal(): void {
    try {
      window.navigator.vibrate([400, 100, 400, 100, 400]);
    } catch (e) {

    }

  }
}
