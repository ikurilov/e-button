import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Observable, take } from 'rxjs';
import {
  EditorState,
  InfoSlide,
  QuestionWithAudioSlide,
  QuestionWithImageSlide,
  Slide,
  SlideType,
} from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { editorActions } from '../../state/editor.actions';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideEditorComponent implements OnInit {
  selectedPatchIndex: number | null = null;

  newSlidePoints: number = 0;
  newSlideIsToxic: boolean = false;
  newInfoRows: string = '[]';
  public editorState: Observable<EditorState> = this.store.select(selectEditor);
  currentSlide = this.editorState.pipe(
    map((editor) => {
      if (typeof editor.currentSlideIndex !== 'number') {
        return null;
      }
      return editor.slides[
        editor.currentSlideIndex >= editor.slides.length
          ? editor.slides.length - 1
          : editor.currentSlideIndex
      ];
    }),
  );

  @ViewChild('shadowPatch', { static: false }) shadowPatch: ElementRef;

  currentSlideIndex = this.editorState.pipe(
    map((editor) => editor.currentSlideIndex),
  );
  slideTypes = SlideType;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @ViewChild('imageContainer', { read: ElementRef }) imageContainer: ElementRef;

  infoControl: FormControl = new FormControl();

  ngOnInit(): void {
    this.infoControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  updateSlide(slideIndex: number, slide: Slide) {
    this.store.dispatch(editorActions.updateslide({ slideIndex, slide }));
  }

  getCastedImageSlide(slide: Slide) {
    return slide as QuestionWithImageSlide;
  }

  getCastedInfoSlide(slide: Slide) {
    return slide as InfoSlide;
  }

  getCastedAudioSlide(slide: Slide) {
    return slide as QuestionWithAudioSlide;
  }

  saveSlide(
    $event: QuestionWithImageSlide | QuestionWithAudioSlide | InfoSlide,
  ) {
    this.currentSlideIndex.pipe(take(1)).subscribe((index) => {
      if (index !== null) {
        this.updateSlide(index, $event);
      }
    });
  }
}
