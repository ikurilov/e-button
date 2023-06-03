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
    private editorService: EditorService,
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
        this.newInfoRows = JSON.stringify(slide.paragraphs);
      }
    });
  }

  setNewSlidePoints() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        if (slide.type === SlideType.questionWithImage) {
          const updatedSlide = { ...slide, points: this.newSlidePoints };
          this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

  setNewSlideToxic() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        if (slide.type === SlideType.questionWithImage) {
          const updatedSlide = { ...slide, toxic: this.newSlideIsToxic };
          this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

  setNewInfoRows() {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        let a = [];
        try {
          a = JSON.parse(this.newInfoRows);
        } catch (e) {
          alert('Invalid JSON');
          return;
        }
        if (slide.type === SlideType.info) {
          const updatedSlide = {
            ...slide,
            paragraphs: a,
          };
          this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

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
  public isMoving = false;
  public isResizing = false;
  private initialMousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private initialPatchPosition: {
    leftInPercent: number;
    topInPercent: number;
  } = { leftInPercent: 0, topInPercent: 0 };
  private initialPatchSize: {
    widthInPercent: number;
    heightInPercent: number;
  } = { widthInPercent: 0, heightInPercent: 0 };

  onMoveMouseDown(event: MouseEvent, patch: any, i: number) {
    event.preventDefault();
    this.isMoving = true;
    this.initialMousePosition = { x: event.clientX, y: event.clientY };
    this.initialPatchPosition = {
      leftInPercent: patch.leftInPercent,
      topInPercent: patch.topInPercent,
    };
    this.initialPatchSize = {
      widthInPercent: patch.widthInPercent,
      heightInPercent: patch.heightInPercent,
    };
    this.selectedPatchIndex = i;
  }

  onResizeMouseDown(event: MouseEvent, patch: any, i: number) {
    event.preventDefault();
    this.isResizing = true;
    this.initialMousePosition = { x: event.clientX, y: event.clientY };
    this.initialPatchSize = {
      widthInPercent: patch.widthInPercent,
      heightInPercent: patch.heightInPercent,
    };
    this.initialPatchPosition = {
      leftInPercent: patch.leftInPercent,
      topInPercent: patch.topInPercent,
    };
    this.selectedPatchIndex = i;
  }

  updateCurrentPatch(
    patchUpdates: Partial<QuestionWithImageSlide['patches'][0]>,
  ) {
    this.editorState.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        const slide = editor.slides[editor.currentSlideIndex];
        if (slide.type === SlideType.questionWithImage) {
          const updatedPatches = slide.patches.map((patch, index) =>
            index === this.selectedPatchIndex
              ? { ...patch, ...patchUpdates }
              : patch,
          );
          const updatedSlide = { ...slide, patches: updatedPatches };
          this.updateSlide(editor.currentSlideIndex, updatedSlide);
        }
      }
    });
  }

  onMouseUp($event: MouseEvent) {
    if (
      this.isMoving &&
      this.selectedPatchIndex !== null &&
      this.updatedPatchPosition
    ) {
      // this.updateCurrentPatch(this.updatedPatchPosition);
      this.updatedPatchPosition = null;
    } else if (
      this.isResizing &&
      this.selectedPatchIndex !== null &&
      this.updatedPatchSize
    ) {
      // this.updateCurrentPatch(this.updatedPatchSize);
      this.updatedPatchSize = null;
    }
    this.isMoving = false;
    this.isResizing = false;
    if (this.shadowPatch?.nativeElement) {
      this.renderer.removeStyle(this.shadowPatch.nativeElement, 'left');
      this.renderer.removeStyle(this.shadowPatch.nativeElement, 'top');
      this.renderer.removeStyle(this.shadowPatch.nativeElement, 'width');
      this.renderer.removeStyle(this.shadowPatch.nativeElement, 'height');
    }
  }

  private updatedPatchPosition: {
    leftInPercent: number;
    topInPercent: number;
  } | null = null;
  private updatedPatchSize: {
    widthInPercent: number;
    heightInPercent: number;
  } | null = null;

  onMouseMove(event: MouseEvent) {
    if (this.isMoving && this.selectedPatchIndex !== null) {
      const deltaX =
        ((event.clientX - this.initialMousePosition.x) /
          this.imageContainer.nativeElement.clientWidth) *
        100;
      const deltaY =
        ((event.clientY - this.initialMousePosition.y) /
          this.imageContainer.nativeElement.clientHeight) *
        100;
      this.updatedPatchPosition = {
        leftInPercent: this.initialPatchPosition.leftInPercent + deltaX,
        topInPercent: this.initialPatchPosition.topInPercent + deltaY,
      };
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'left',
        this.updatedPatchPosition.leftInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'top',
        this.updatedPatchPosition.topInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'width',
        this.initialPatchSize.widthInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'height',
        this.initialPatchSize.heightInPercent + '%',
      );
    } else if (this.isResizing && this.selectedPatchIndex !== null) {
      const deltaWidth =
        ((event.clientX - this.initialMousePosition.x) /
          this.imageContainer.nativeElement.clientWidth) *
        100;
      const deltaHeight =
        ((event.clientY - this.initialMousePosition.y) /
          this.imageContainer.nativeElement.clientHeight) *
        100;
      this.updatedPatchSize = {
        widthInPercent: Math.max(
          this.initialPatchSize.widthInPercent + deltaWidth,
          1,
        ),
        heightInPercent: Math.max(
          this.initialPatchSize.heightInPercent + deltaHeight,
          1,
        ),
      };
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'left',
        this.initialPatchPosition.leftInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'top',
        this.initialPatchPosition.topInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'width',
        this.updatedPatchSize.widthInPercent + '%',
      );
      this.renderer.setStyle(
        this.shadowPatch.nativeElement,
        'height',
        this.updatedPatchSize.heightInPercent + '%',
      );
    }
  }
}
