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
  alreadyAnswered: { [team: string]: Date };
}

export enum GamePhaseType {
  PAUSE = 'PAUSE',
  ASKING = 'ASKING',
  ANSWERING = 'ANSWERING'
}

export interface IClientGameState {
  freezeTime?: number;
  phaseType: GamePhaseType;
  teamsInGame: Teams[];
  answeringTeam: Teams;
  myName: string;
  myTeam: Teams;
}
