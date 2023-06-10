import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FileListItem } from '../../../../services/editor.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: [
    './image-card.component.scss',
    '../../styles/card.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent {
  @Input()
  public imageFile: FileListItem;

  @Output()
  public createSlideWithImage = new EventEmitter<FileListItem>();

  @Output()
  public addImageToSlide = new EventEmitter<FileListItem>();
}
