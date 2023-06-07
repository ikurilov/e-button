import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EditorState, SlideType } from '../../../../state/editor.state';
import { Store } from '@ngrx/store';
import { editorActions } from '../../../../state/editor.actions';
import { FormControl, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
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
  slideTypes = SlideType;
  pointControl = new FormControl(10, [Validators.min(0)]);

  public selectEditor: Observable<EditorState> =
    this.store.select(selectEditor);

  public currentSlide = this.store.select(selectCurrentSlide);

  public selectCurrentSlideStats = this.store.select(selectCurrentSlideStats);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  addSlide(slideType: SlideType) {
    this.store.dispatch(editorActions.addslide({ slideType }));
  }

  moveSlideUp() {}

  moveSlideDown() {}

  removeSlide() {}

  toxic() {}

  addPatch() {
    let newPatch = {
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
