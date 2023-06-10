import { QuestionWithImageSlide } from '../../../../../../src/app/models/models';

export interface RemoteState {
  screen: RemoteScreens;
  questionWithImageState?: QuestionWithImageState;
  connectInfo?: ConnectInfo;
  infos?: string[];
}

export interface QuestionWithImageState extends QuestionWithImageSlide {
  number: number;
  phase: QuestionPhases;
  answerResult?: 'CORRECT' | 'WRONG';
  answeringTeam?: string;
}

export interface ConnectInfo {
  qrCode: string;
  teams: { name: string; players: string[] }[];
}

export enum QuestionPhases {
  'TITLE' = 'TITLE',
  'ASK' = 'ASK',
  'ANSWER' = 'ANSWER',
  'RESULTS' = 'RESULTS',
}

export enum RemoteScreens {
  DEFAULT = 'DEFAULT',
  QUESTION = 'QUESTION',
  BREAK = 'BREAK',
  CONNECT = 'CONNECT',
  INFO = 'INFO',
}

export const initialRemoteState: RemoteState = {
  screen: RemoteScreens.DEFAULT,
};
