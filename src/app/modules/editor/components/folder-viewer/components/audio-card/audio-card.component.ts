import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FileListItem } from '../../../../services/editor.service';

@Component({
  selector: 'app-audio-card',
  templateUrl: './audio-card.component.html',
  styleUrls: [
    './audio-card.component.scss',
    '../../styles/card.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioCardComponent implements OnInit, AfterViewInit {
  @Input()
  public audioFile: FileListItem;

  @Output()
  public add = new EventEmitter();

  @ViewChild('audioElement')
  public audioElement: ElementRef;

  public ngOnInit(): void {
    // this.audioElement.nativeElement.load();
  }

  public ngAfterViewInit(): void {
    // this.audioElement.nativeElement.load();
  }

  public playAudio(): void {
    (this.audioElement.nativeElement as HTMLMediaElement).play();
  }

  public stopAudio(): void {
    this.audioElement.nativeElement.pause();
  }
}
