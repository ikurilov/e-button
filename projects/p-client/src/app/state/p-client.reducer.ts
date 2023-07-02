import { createReducer, on } from '@ngrx/store';
import { pClientActions } from './p-client.actions';
import { PClientPhase, PClientState } from './p-client.state';

export const initialState: PClientState = {
  answeringResult: false,
  answeringTeam: null,
  id: '',
  throttle: 500,
  freezeTime: 0,
  phase: PClientPhase.PAUSE,
  teamsInGame: [],
  myName: '',
  myTeam: undefined,
};
export const pClientReducer = createReducer(
  initialState,
  on(
    pClientActions.initSequenceCompleted,
    (state, { name, id, icon, team }) => ({
      ...state,
      myName: name,
      id,
      myIcon: icon,
      myTeam: team,
    }),
  ),
  on(pClientActions.syncFromHost, (state, patch) => ({
    ...state,
    ...patch,
  })),

  // Обработчик для события 'Set State'
  on(pClientActions.setState, (state, { data }) => ({
    ...state,
    ...data,
  })),

  // Обработчик для события 'Patch State'
  on(pClientActions.patchState, (state, data) => ({
    ...state,
    ...data,
  })),

  // Обработчик для события 'Change Name'
  on(pClientActions.changeName, (state, { name }) => ({
    ...state,
    myName: name,
  })),

  // Обработчик для события 'Change Team'
  on(pClientActions.changeTeam, (state, { team }) => ({
    ...state,
    myTeam: team,
  })),
  on(pClientActions.changeIcon, (state, { icon }) => ({
    ...state,
    myIcon: icon,
  })),

  // Обработчик для события 'Change Throttle'
  on(pClientActions.changeThrottle, (state, { throttle }) => ({
    ...state,
    throttle,
  })),

  // Обработчик для события 'Answer Result'
  on(pClientActions.answerResult, (state, { result, team }) => ({
    ...state,
    answeringTeam: team,
    phase: PClientPhase.ANSWER_RESULT,
    answeringResult: result,
  })),
  on(pClientActions.startAnswering, (state, { answeringTeam }) => ({
    ...state,
    phase: PClientPhase.ANSWERING,
    answeringTeam,
  })),
);
