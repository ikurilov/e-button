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
  QuestionWithImageSlide,
  Slide,
  SlideType,
} from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { EditorService } from '../../services/editor.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { editorActions } from '../../state/editor.actions';

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
  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);
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
    map((editor) => {
      return editor.currentSlideIndex;
    }),
  );
  slideTypes = SlideType;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @ViewChild('imageContainer', { read: ElementRef }) imageContainer: ElementRef;

  ngOnInit(): void {
    this.currentSlide.pipe().subscribe((slide) => {
      if (slide && slide.type === SlideType.questionWithImage) {
        this.newSlidePoints = slide.points;
        this.newSlideIsToxic = slide.toxic;
      }
      if (slide && slide.type === SlideType.info) {
        // this.newInfoRows = JSON.stringify(slide.paragraphs);
      }
    });
  }

  // setNewSlidePoints() {
  //   this.editorState.pipe(take(1)).subscribe((editor) => {
  //     if (editor.currentSlideIndex !== null) {
  //       const slide = editor.slides[editor.currentSlideIndex];
  //       if (slide.type === SlideType.questionWithImage) {
  //         const updatedSlide = { ...slide, points: this.newSlidePoints };
  //         this.updateSlide(editor.currentSlideIndex, updatedSlide);
  //       }
  //     }
  //   });
  // }

  // setNewSlideToxic() {
  //   this.editorState.pipe(take(1)).subscribe((editor) => {
  //     if (editor.currentSlideIndex !== null) {
  //       const slide = editor.slides[editor.currentSlideIndex];
  //       if (slide.type === SlideType.questionWithImage) {
  //         const updatedSlide = { ...slide, toxic: this.newSlideIsToxic };
  //         this.updateSlide(editor.currentSlideIndex, updatedSlide);
  //       }
  //     }
  //   });
  // }

  // setNewInfoRows() {
  //   this.editorState.pipe(take(1)).subscribe((editor) => {
  //     if (editor.currentSlideIndex !== null) {
  //       const slide = editor.slides[editor.currentSlideIndex];
  //       let a = [];
  //       try {
  //         a = JSON.parse(this.newInfoRows);
  //       } catch (e) {
  //         alert('Invalid JSON');
  //         return;
  //       }
  //       if (slide.type === SlideType.info) {
  //         const updatedSlide = {
  //           ...slide,
  //           paragraphs: a,
  //         };
  //         this.updateSlide(editor.currentSlideIndex, updatedSlide);
  //       }
  //     }
  //   });
  // }

  createPatchElement() {
    const patch = {
      leftInPercent: 25,
      topInPercent: 25,
      widthInPercent: 25,
      heightInPercent: 25,
      text: '',
    };
    return patch;
  }

  addPatch() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        if (slide.type === SlideType.questionWithImage) {
          const updatedPatches = [...slide.patches, this.createPatchElement()];
          const updatedSlide = { ...slide, patches: updatedPatches };
          // this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

  deletePatch(i: number) {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        if (slide.type === SlideType.questionWithImage) {
          let newPatches = [...slide.patches];
          newPatches.splice(i, 1);
          const updatedSlide = { ...slide, patches: newPatches };
          this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

  updateSlide(slideIndex: number, slide: Slide) {
    this.store.dispatch(editorActions.updateslide({ slideIndex, slide }));
  }

  createSlide(type: SlideType) {
    this.store.dispatch(editorActions.addslide({ slideType: type }));
  }

  moveSlide(dir: 'up' | 'down') {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (dir === 'up' && editor.currentSlideIndex > 0) {
        this.store.dispatch(
          editorActions.moveslide({
            slideIndex: editor.currentSlideIndex,
            newIndex: editor.currentSlideIndex - 1,
          }),
        );
      } else if (
        dir === 'down' &&
        editor.currentSlideIndex < editor.slides.length - 1
      ) {
        this.store.dispatch(
          editorActions.moveslide({
            slideIndex: editor.currentSlideIndex,
            newIndex: editor.currentSlideIndex + 1,
          }),
        );
      }
    });
  }

  deleteSlide() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        this.store.dispatch(
          editorActions.deleteslide({ slideIndex: editor.currentSlideIndex }),
        );
      }
    });
  }

  // Variables and methods for moving and resizing patches

  getCastedSlide(slide: Slide) {
    return slide as QuestionWithImageSlide;
  }

  saveSlide($event: QuestionWithImageSlide) {
    this.currentSlideIndex.pipe(take(1)).subscribe((index) => {
      if (index !== null) {
        this.updateSlide(index, $event);
      }
    });
  }
}
