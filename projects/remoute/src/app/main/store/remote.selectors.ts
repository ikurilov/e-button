import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RemoteScreens, RemoteState } from './remote.state';

export const selectRemoteState = createFeatureSelector<RemoteState>('remote');

export const selectRemoteScreen = createSelector(
  selectRemoteState,
  (state) => state.screen,
);

export const selectIsDefaultScreen = createSelector(
  selectRemoteScreen,
  (screen) => screen === RemoteScreens.DEFAULT,
);

export const selectIsBreakScreen = createSelector(
  selectRemoteScreen,
  (screen) => screen === RemoteScreens.BREAK,
);

export const selectIsConnectScreen = createSelector(
  selectRemoteScreen,
  (screen) => screen === RemoteScreens.CONNECT,
);

export const selectIsQuestionScreen = createSelector(
  selectRemoteScreen,
  (screen) => screen === RemoteScreens.QUESTION,
);

export const selectQuestionWithImageState = createSelector(
  selectRemoteState,
  (state) => state.questionWithImageState,
);

export const selectConnectInfo = createSelector(
  selectRemoteState,
  (state) => state.connectInfo,
);

export const selectInfos = createSelector(
  selectRemoteState,
  (state) => state.infos,
);
