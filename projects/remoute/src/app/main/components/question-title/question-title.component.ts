import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectRemoteQuestionNumber,
  selectRemoteSlide,
} from '../../store/remote.selectors';
import { Observable } from 'rxjs';
import { QuestionWithImageSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';

@Component({
  selector: 'app-question-title',
  templateUrl: './question-title.component.html',
  styleUrls: ['./question-title.component.scss'],
})
export class QuestionTitleComponent implements OnInit {
  questionNumber = this.store.select(selectRemoteQuestionNumber);

  slide = this.store.select(
    selectRemoteSlide,
  ) as Observable<QuestionWithImageSlide>;
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
