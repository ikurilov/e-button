import { PClientState } from './p-client.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPClientState =
  createFeatureSelector<PClientState>('pClient');

export const selectPClient = createSelector(
  selectPClientState,
  (state) => state,
);

export const selectPClientPhase = createSelector(
  selectPClientState,
  (state) => state.phase,
);

export const selectMyTeam = createSelector(
  selectPClientState,
  (state) => state.myTeam,
);

export const selectIsMyTeamAnswering = createSelector(
  selectPClientState,
  (state) => state.answeringTeam && state.answeringTeam === state.myTeam,
);

export const selectAnsweringTeam = createSelector(
  selectPClientState,
  (state) => state.answeringTeam,
);

export const selectAnsweringResult = createSelector(
  selectPClientState,
  (state) => state.answeringResult,
);

export const selectFreezeTime = createSelector(
  selectPClientState,
  (state) => state.freezeTime,
);

export const selectThrottle = createSelector(
  selectPClientState,
  (state) => state.throttle,
);

export const selectTeamsInGame = createSelector(
  selectPClientState,
  (state) => state.teamsInGame,
);
