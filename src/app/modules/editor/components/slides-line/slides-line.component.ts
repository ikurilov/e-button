import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  EditorState, QuestionWithImageSlide, Slide, SlideType,
} from '../../state/editor.state';
import { selectEditor } from '../../state/editor.selectors';
import { map } from 'rxjs/operators';
import { editorActions } from '../../state/editor.actions';

@Component({
  selector: 'app-slides-line',
  templateUrl: './slides-line.component.html',
  styleUrls: ['./slides-line.component.scss'],
})
export class SlidesLineComponent implements OnInit {
  slideTypes = SlideType;

  private editorState: Observable<EditorState> =
    this.store.select(selectEditor);

  public slides = this.editorState.pipe(map((editor) => editor.slides));
  constructor(private store: Store) {}

  ngOnInit(): void {}

  getTypedSlides(async: Slide[] | null): Slide[] {
    return async as Slide[];
  }

  getCastedSlide(slide: Slide): QuestionWithImageSlide {
    return slide as QuestionWithImageSlide;
  }

  setCurrentSlide(i: number) {
    this.store.dispatch(editorActions.setcurrentslide({ index: i }));
  }
}
