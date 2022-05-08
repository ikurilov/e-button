import {
  GamePhaseType,
  IGameConfig,
  IGameState,
  IPhaseState,
} from './models';

export const defaultGameConfig: IGameConfig = {
  teams: [],
  forbidTeamChanging: false,
  wrongAnswerFreezeTimeSec: 0,
};

export const defaultGameState: IGameState = {
  scores: {},
  questionNumber: 0,
};

export const defaultPhaseState: IPhaseState = {
  type: GamePhaseType.WAITING_FOR_START,
};
