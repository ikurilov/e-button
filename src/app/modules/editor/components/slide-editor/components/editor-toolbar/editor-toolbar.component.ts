import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditorState, SlideType } from '../../../../state/editor.state';
import { Store } from '@ngrx/store';
import { editorActions } from '../../../../state/editor.actions';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import {
  selectCurrentSlide,
  selectCurrentSlideStats,
  selectEditor,
} from '../../../../state/editor.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarComponent implements OnInit {
  public slideTypes = SlideType;
  public pointControl = new FormControl(10, [Validators.min(0)]);

  public selectEditor: Observable<EditorState> =
    this.store.select(selectEditor);

  public currentSlide = this.store.select(selectCurrentSlide);

  public selectCurrentSlideStats = this.store.select(selectCurrentSlideStats);

  public isToxic = this.currentSlide.pipe(
    // @ts-ignore
    map((slideWrapper) => slideWrapper.slide?.toxic),
  );

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pointControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.currentSlide.pipe(take(1)).subscribe((slideWrapper) => {
          if (slideWrapper.slide) {
            this.store.dispatch(
              editorActions.updateslide({
                slideIndex: slideWrapper.slideIndex,
                slide: {
                  ...slideWrapper.slide,
                  // @ts-ignore
                  points: value,
                },
              }),
            );
          }
        });
      });

    this.currentSlide
      .pipe(takeUntil(this.destroy$))
      .subscribe((slideWrapper) => {
        // @ts-ignore
        if (slideWrapper.slide?.points) {
          // @ts-ignore
          this.pointControl.setValue(slideWrapper.slide.points, {
            emitEvent: false,
          });
        }
      });
  }

  addSlide(slideType: SlideType) {
    this.store.dispatch(editorActions.addslide({ slideType }));
  }

  moveSlideUp() {
    this.selectEditor.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex > 0) {
        this.store.dispatch(
          editorActions.moveslide({
            slideIndex: editor.currentSlideIndex,
            newIndex: editor.currentSlideIndex - 1,
          }),
        );
      }
    });
  }

  moveSlideDown() {
    this.selectEditor.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex < editor.slides.length - 1) {
        this.store.dispatch(
          editorActions.moveslide({
            slideIndex: editor.currentSlideIndex,
            newIndex: editor.currentSlideIndex + 1,
          }),
        );
      }
    });
  }

  removeSlide() {
    this.selectEditor.pipe(take(1)).subscribe((editor) => {
      if (editor.currentSlideIndex !== null) {
        this.store.dispatch(
          editorActions.deleteslide({ slideIndex: editor.currentSlideIndex }),
        );
      }
    });
  }

  isQuestionSlide(): Observable<boolean> {
    return this.selectCurrentSlideStats.pipe(
      map((stats) => (
          stats?.slide.type === SlideType.questionWithImage ||
          stats?.slide.type === SlideType.questionWithAudio
        )),
    );
  }

  setToxic() {
    this.currentSlide.pipe(take(1)).subscribe((slideWrapper) => {
      if (slideWrapper) {
        this.store.dispatch(
          editorActions.updateslide({
            slide: {
              ...slideWrapper.slide,
              // @ts-ignore
              toxic: !slideWrapper.slide.toxic,
            },
            slideIndex: slideWrapper.slideIndex,
          }),
        );
      }
    });
  }

  addPatch() {
    const newPatch = {
      position: {
        top: 25,
        left: 25,
        width: 20,
        height: 20,
      },
    };
    this.currentSlide.pipe(take(1)).subscribe((slideWrapper) => {
      if (
        slideWrapper.slide &&
        slideWrapper.slide.type === SlideType.questionWithImage
      ) {
        this.store.dispatch(
          editorActions.updateslide({
            slide: {
              ...slideWrapper.slide,
              patches: [...slideWrapper.slide.patches, newPatch],
            },
            slideIndex: slideWrapper.slideIndex,
          }),
        );
      }
    });
  }

  setViewMode(viewMode: 'question' | 'answer' | 'edit') {
    this.store.dispatch(editorActions.setviewmode({ viewMode }));
  }
}
