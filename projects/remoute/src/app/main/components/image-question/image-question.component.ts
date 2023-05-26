import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectQuestionWithImageState,
  selectRemoteScreen,
} from '../../store/remote.selectors';
import { QuestionPhases, RemoteScreens } from '../../store/remote.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-question',
  templateUrl: './image-question.component.html',
  styleUrls: ['./image-question.component.scss'],
})
export class ImageQuestionComponent implements OnInit {
  selectImageQuestion = this.store.select(selectQuestionWithImageState);

  screenType = RemoteScreens;
  questionPhases = QuestionPhases;
  remoteScreen: Observable<RemoteScreens> =
    this.store.select(selectRemoteScreen);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
