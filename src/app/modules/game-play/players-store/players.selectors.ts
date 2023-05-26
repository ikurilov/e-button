import { PlayersState } from './players.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPlayersState =
  createFeatureSelector<PlayersState>('players');

export const selectPlayers = createSelector(
  selectPlayersState,
  (state) => state.list,
);
