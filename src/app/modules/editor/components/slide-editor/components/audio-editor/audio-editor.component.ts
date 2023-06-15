import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { QuestionWithAudioSlide } from '../../../../state/editor.state';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-audio-editor',
  templateUrl: './audio-editor.component.html',
  styleUrls: ['./audio-editor.component.scss'],
})
export class AudioEditorComponent implements OnInit {
  @Input()
  slide: QuestionWithAudioSlide;

  @Output()
  slideChange = new EventEmitter<QuestionWithAudioSlide>();

  @ViewChild('waveform', { static: true }) waveformElement!: ElementRef;

  duration = new BehaviorSubject('00:00:00');

  currentTime = new BehaviorSubject('00:00:00');

  isLoop = false;

  private waveSurfer!: WaveSurfer;

  private activeRegion: Region = null;

  ngOnInit() {
    this.createWaveform();
  }

  play() {
    this.waveSurfer.playPause()
  }

  zoomChange(event) {
    this.waveSurfer.zoom(event.target.valueAsNumber);
  }

  forward(time = 5) {
    console.log(time);
    this.waveSurfer.skip(time);
  }

  backward(time = 5) {
    this.waveSurfer.skip(-time);
  }

 handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const volume = Number(target.value) / 100;
    this.waveSurfer.setVolume(volume);
  }

  private formatTimeCode(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  private createWaveform() {
    this.waveSurfer = WaveSurfer.create({
      container: this.waveformElement.nativeElement,
      height: 80,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      waveColor: '#ff5501',
      progressColor: `#d44700`,
      url: this.slide.audio.audioCoded,
      hideScrollbar: false,
    });

    const wsRegions = this.waveSurfer.registerPlugin(RegionsPlugin.create());

    this.waveSurfer.on('decode', () => {
      wsRegions.addRegion({
        id: 'question',
        start: this.slide.question.start,
        end: this.slide.question.end,
        content: 'Вопрос',
        color: 'rgba(255, 85, 0, 0.5)',
      });
      wsRegions.addRegion({
        id: 'answer',
        start: this.slide.answer.start,
        end: this.slide.answer.end,
        content: 'Ответ',
        color: 'rgba(0, 255, 0, 0.3)',
      });

      this.duration.next(this.formatTimeCode(this.waveSurfer.getDuration()));
    });

    wsRegions.on('region-updated', (region) => {
      if (region.id === 'question') {
        this.slideChange.emit({
          ...this.slide,
          question: {
            start: region.start,
            end: region.end,
            loop: false,
          },
        });
      }

      if (region.id === 'answer') {
        this.slideChange.emit({
          ...this.slide,
          answer: {
            start: region.start,
            end: region.end,
            loop: false,
          },
        });
      }

      this.activeRegion = region;
      this.activeRegion.play();
    });

    this.waveSurfer.on('timeupdate', (currentTime) => {
      this.duration.next(this.formatTimeCode(currentTime));

      if (
        this.activeRegion &&
        this.waveSurfer.isPlaying() &&
        currentTime >= this.activeRegion.end
      ) {
        if (this.isLoop) {
          this.waveSurfer.setTime(this.activeRegion.start);
        } else {
          this.waveSurfer.pause();
          this.activeRegion = null;
        }
      }
    });
  }
}
