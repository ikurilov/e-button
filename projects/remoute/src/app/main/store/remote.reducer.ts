import { remoteActions } from './remote.actions';
import { createReducer, on } from '@ngrx/store';
import { RemoteScreens, RemoteState } from './remote.state';

export const initialState: RemoteState = {
  screen: RemoteScreens.DEFAULT,
};

export const remoteReducer = createReducer(
  initialState,
  on(remoteActions.setDefault, (state) => ({
    ...state,
    screen: RemoteScreens.DEFAULT,
    questionWithImageState: undefined,
    connectInfo: undefined,
    infos: undefined,
  })),
  on(remoteActions.setBreak, (state) => ({
    ...state,
    screen: RemoteScreens.BREAK,
    questionWithImageState: undefined,
    connectInfo: undefined,
    infos: undefined,
  })),
  on(remoteActions.setInfo, (state, { data }) => ({
    ...state,
    screen: RemoteScreens.INFO,
    questionWithImageState: undefined,
    connectInfo: undefined,
    infos: data,
  })),
  on(remoteActions.setConnect, (state, { data }) => ({
    ...state,
    screen: RemoteScreens.CONNECT,
    connectInfo: data,
    questionWithImageState: undefined,
    infos: undefined,
  })),
  on(remoteActions.setImageQuestion, (state, { data }) => ({
    ...state,
    screen: RemoteScreens.QUESTION,
    questionWithImageState: data,
    connectInfo: undefined,
    infos: undefined,
  })),
);
