import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { QuestionWithImageSlide } from '../../../../../../../src/app/modules/editor/state/editor.state';
import {
  selectRemoteFight,
  selectRemotePlayPhases,
  selectRemoteQuestionAnswerState,
  selectRemoteScore,
  selectRemoteSlide,
} from '../../store/remote.selectors';
import {
  Fight,
  GamePlayState,
  PlayPhases,
  TeamColors,
} from '../../../../../../../src/app/modules/game-play/store/game-play.state';
import { Teams } from '../../../../../../../models/shared-models';

@Component({
  selector: 'app-image-question',
  templateUrl: './image-question.component.html',
  styleUrls: ['./image-question.component.scss'],
})
export class ImageQuestionComponent implements OnInit {
  public slide: Observable<QuestionWithImageSlide> = this.store.select(
    selectRemoteSlide,
  ) as Observable<QuestionWithImageSlide>;

  public fight: Observable<Fight> = this.store.select(selectRemoteFight);

  public phase: Observable<PlayPhases> = this.store.select(
    selectRemotePlayPhases,
  );

  public questionAnswerState: Observable<GamePlayState['questionAnswerState']> =
    this.store.select(selectRemoteQuestionAnswerState);

  playPhases = PlayPhases;

  teamColors = TeamColors;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  protected readonly Teams = Teams;
}
