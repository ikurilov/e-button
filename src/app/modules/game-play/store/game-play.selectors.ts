import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamePlayState, TeamColors } from './game-play.state';

// Define a feature selector to get the game play state
export const selectGamePlayState =
  createFeatureSelector<GamePlayState>('gamePlay');

export const selectGamePlay = createSelector(
  selectGamePlayState,
  (state) => state,
);

// Define a selector to get the current slide index
export const selectCurrentSlideIndex = createSelector(
  selectGamePlayState,
  (state) => state.currentSlideIndex,
);

// Define a selector to get the current slide
export const selectCurrentSlide = createSelector(
  selectGamePlayState,
  (state) => state.currentSlide,
);

// Define a selector to get the score of a particular team
export const selectTeamScore = createSelector(
  selectGamePlayState,
  (state) => state.score,
);

export const selectConfig = createSelector(
  selectGamePlayState,
  (state) => state.gameConfig,
);

export const selectPlayPhase = createSelector(
  selectGamePlayState,
  (state) => state.playPhase,
);

export const selectQuestionAnswerState = createSelector(
  selectGamePlayState,
  (state) => state.questionAnswerState,
);

export const selectFightList = createSelector(
  selectGamePlayState,
  (state) => state.fightList,
);
