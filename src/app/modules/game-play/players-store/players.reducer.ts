import { createReducer, on } from '@ngrx/store';
import { playersActions } from './players.actions';
import { PlayersState } from './players.state';

export const initialState: PlayersState = {
  list: [],
};

export const playersReducer = createReducer(
  initialState,
  // on(playersActions.joinPlayer, (state, { player }) => ({
  //   ...state,
  //   list: [...state.list, player],
  // })),
  on(playersActions.createPlayer, (state, { id, name, icon, team }) => ({
    ...state,
    list: [
      ...state.list,
      { id, name, icon, online: true, pingMS: 0, pingRecords: [], team },
    ],
  })),
  on(playersActions.deletePlayer, (state, { id }) => ({
    ...state,
    list: state.list.filter((entity) => entity.id !== id),
  })),

  on(playersActions.applyUpdate, (state, { entity }) => ({
    ...state,
    list: state.list.map((e) => (e.id === entity.id ? entity : e)),
  })),

  on(playersActions.updatePlayerOnline, (state, { id, online }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, online } : e)),
  })),

  on(playersActions.updatePlayerPing, (state, { id, pingMS }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, pingMS } : e)),
  })),
  on(playersActions.updatePlayerSyncInfo, (state, { id, syncInfo }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, syncInfo } : e)),
  })),
  on(playersActions.updatePlayerName, (state, { id, name }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, name } : e)),
  })),
  on(playersActions.updatePlayerTeam, (state, { id, team }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, team } : e)),
  })),
  on(playersActions.updatePlayerIcon, (state, { id, icon }) => ({
    ...state,
    list: state.list.map((e) => (e.id === id ? { ...e, icon } : e)),
  })),
);
