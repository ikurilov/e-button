import { Teams } from '../../../models/shared-models';

export interface IGameConfig {
  teams: Teams[];
  forbidTeamChanging: boolean;
  wrongAnswerFreezeTimeSec: number;
  onlyOneAnswer: boolean;
}

export interface IGameState {
  scores: { [team: string]: number };
  questionNumber: number;
}

export interface IPhaseState {
  type: GamePhaseType;
  answering?: Teams;
  alreadyAnswered?: { [team: string]: Date };
}

export enum GamePhaseType {
  WAITING_FOR_START = 'WAITING_FOR_START',
  PAUSE = 'PAUSE',
  ASKING = 'ASKING',
  ANSWERING = 'ANSWERING'
}

export interface IClientGameState {
  phaseType: GamePhaseType,
  teamsInGame: Teams[],
  answeringTeam: Teams,
  myName: string,
  myTeam: Teams;
}
