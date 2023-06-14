import { remoteActions } from './remote.actions';
import { createReducer, on } from '@ngrx/store';
import { RemoteState } from './remote.state';
import { SlideType } from '../../../../../../src/app/modules/editor/state/editor.state';
import { PlayPhases } from '../../../../../../src/app/modules/game-play/store/game-play.state';

export const initialState: RemoteState = {};

export const remoteReducer = createReducer(
  initialState,
  on(remoteActions.infoSlideMessage, (state, { content }) => ({
    ...state,
    playPhases: PlayPhases.SIMPLE,
    slide: {
      type: SlideType.info,
      content,
    },
  })),
  on(remoteActions.breakSlideMessage, (state) => ({
    ...state,
    playPhases: PlayPhases.SIMPLE,
    slide: {
      type: SlideType.break,
    },
  })),
  on(remoteActions.resultSlideMessage, (state, { score }) => ({
    ...state,
    playPhases: PlayPhases.SIMPLE,
    // TODO: add score
    slide: {
      type: SlideType.result,
    },
  })),
  on(remoteActions.connectInfoMessage, (state, { data }) => ({
    ...state,
    connectInfo: data,
  })),
  on(remoteActions.questionImagesLoaded, (state, { slide }) => ({
    ...state,
    playPhases: PlayPhases.QUESTION_TITLE,
    slide,
  })),
  on(remoteActions.countdownMessage, (state) => ({
    ...state,
    playPhases: PlayPhases.QUESTION_COUNTDOWN,
    questionAnswerState: null,
  })),
  on(remoteActions.askMessage, (state) => ({
    ...state,
    playPhases: PlayPhases.QUESTION_ASK,
    questionAnswerState: null,
  })),
  on(remoteActions.startFightMessage, (state, { data }) => ({
    ...state,
    playPhases: PlayPhases.QUESTION_FIGHT,
    fight: data,
    questionAnswerState: null,
  })),
  on(remoteActions.addPlayerToFightMessage, (state, { data }) => ({
    ...state,
    fight: {
      ...state.fight,
      pushes: [...state.fight.pushes, data],
    },
  })),
  on(remoteActions.questionListeningMessage, (state, { data }) => ({
    ...state,
    questionAnswerState: data,
    playPhases: PlayPhases.QUESTION_LISTENING,
  })),
  on(remoteActions.questionVerdictMessage, (state, { data }) => ({
    ...state,
    questionAnswerState: data,
    playPhases: PlayPhases.QUESTION_VERDICT,
  })),
  on(remoteActions.questionAnswerMessage, (state) => ({
    ...state,
    playPhases: PlayPhases.QUESTION_ANSWER_SHOW,
  })),
);
