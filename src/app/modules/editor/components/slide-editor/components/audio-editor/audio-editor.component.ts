import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { QuestionWithAudioSlide } from '../../../../state/editor.state';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions';

@Component({
  selector: 'app-audio-editor',
  templateUrl: './audio-editor.component.html',
  styleUrls: ['./audio-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioEditorComponent implements OnInit {
  @Input()
  slide: QuestionWithAudioSlide;

  @Output()
  slideChange = new EventEmitter<QuestionWithAudioSlide>();

  @ViewChild('waveform', { static: true }) waveformElement!: ElementRef;

  isLoop = false;

  private waveSurfer!: WaveSurfer;

  private activeRegion: Region = null;

  ngOnInit() {
    console.log(this.slide);
    this.createWaveform();
  }

  createWaveform() {
    this.waveSurfer = WaveSurfer.create({
      container: this.waveformElement.nativeElement,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: this.slide.audio.audioCoded,
    });

    const wsRegions = this.waveSurfer.registerPlugin(RegionsPlugin.create());

    this.waveSurfer.on('decode', () => {
      wsRegions.addRegion({
        id: 'question',
        start: this.slide.question.start,
        end: this.slide.question.end,
        content: 'Вопрос',
        color: 'rgba(0, 0, 255, 0.3)',
      });
      wsRegions.addRegion({
        id: 'answer',
        start: this.slide.answer.start,
        end: this.slide.answer.end,
        content: 'Ответ',
        color: 'rgba(0, 255, 0, 0.3)',
      });
    });

    wsRegions.on('region-updated', (region) => {
      if (region.id === 'question') {
        this.slideChange.emit({
          ...this.slide,
          question: {
            start: region.start,
            end: region.end,
            loop: false,
          }
        });
      }

      if (region.id === 'answer') {
        this.slideChange.emit({
          ...this.slide,
          answer: {
            start: region.start,
            end: region.end,
            loop: false,
          }
        });
      }

      this.activeRegion = region;
      this.activeRegion.play();
    });

    this.waveSurfer.on('timeupdate', (currentTime) => {
      if (this.activeRegion && this.waveSurfer.isPlaying() && currentTime >= this.activeRegion.end) {
        if (this.isLoop) {
          this.waveSurfer.setTime(this.activeRegion.start);
        } else {
          this.waveSurfer.pause();
          this.activeRegion = null;
        }
      }
    });
  }

  play() {
    this.waveSurfer.playPause();
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
}
