import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemoteState } from './remote.state';

export const selectRemoteState = createFeatureSelector<RemoteState>('remote');

export const selectRemotePlayPhases = createSelector(
  selectRemoteState,
  (state) => state.playPhases,
);

export const selectRemoteConnectInfo = createSelector(
  selectRemoteState,
  (state) => state.connectInfo,
);

export const selectRemoteFight = createSelector(
  selectRemoteState,
  (state) => state.fight,
);

export const selectRemoteSlide = createSelector(
  selectRemoteState,
  (state) => state.slide,
);

export const selectRemoteQuestionAnswerState = createSelector(
  selectRemoteState,
  (state) => state.questionAnswerState,
);

export const selectRemoteScore = createSelector(
  selectRemoteState,
  (state) => state.score,
);
