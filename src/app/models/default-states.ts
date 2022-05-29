import { GamePhaseType, IGameConfig, IGameState, IPhaseState, } from './models';
import { Teams } from '../../../models/shared-models';

export const defaultGameConfig: IGameConfig = {
  teams: [Teams.PURPLE, Teams.YELLOW, Teams.CYAN],
  forbidTeamChanging: false,
  wrongAnswerFreezeTimeSec: 5,
  onlyOneAnswer: false,
};

export const defaultGameState: IGameState = {
  scores: {},
  questionNumber: 0,
};

export const defaultPhaseState: IPhaseState = {
  type: GamePhaseType.PAUSE,
  alreadyAnswered: {}
};
