import { Teams } from '../../../models/shared-models';

export interface IGameConfig {
  teams: Teams[];
  forbidTeamChanging: boolean;
  wrongAnswerFreezeTimeSec: number;

}

export interface IGameState {
  scores: { [index: string]: number };
  questionNumber: number;
}

export interface IPhaseState {
  type: GamePhaseType;
  answering?: Teams;
  alreadyAnswered?: { team: Teams, date: Date };
}

export enum GamePhaseType {
  WAITING_FOR_START = 'WAITING_FOR_START',
  PAUSE = 'PAUSE',
  ASKING = 'ASKING',
  ANSWERING = ''
}

export interface IClientGameState {
  phaseType: GamePhaseType,
  teamsInGame: Teams[],
  answeringTeam: Teams,
  myName: string,
  myTeam: Teams;
}
