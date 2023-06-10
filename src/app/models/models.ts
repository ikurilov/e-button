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

export type Slide =
  | QuestionWithImageSlide
  | InfoSlide
  | BreakSlide
  | QuestionWithAudioSlide
  | RoundSlide
  | ResultSlide;

export enum SlideType {
  questionWithImage = 'questionWithImage',
  info = 'info',
  break = 'break',
  questionWithAudio = 'questionWithAudio',
  round = 'round',
  result = 'result',
}

export interface AbsolutePosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface QuestionSlide {
  points: number;
  toxic: boolean;
}

export type QuestionWithImageSlide = QuestionSlide & {
  type: SlideType.questionWithImage;
  images: {
    position: AbsolutePosition;
    takenFrom: string;
    W2HRatio?: number;
    showOnly?: 'question' | 'answer';
    imageSource: string;
  }[];
  text?: string;
  patches: {
    position: AbsolutePosition;
    text?: string;
  }[];
};

export type QuestionWithAudioSlide = QuestionSlide & {
  type: SlideType.questionWithAudio;
  audio: {
    audioCoded: string;
    takenFrom: string;
  };
  question: {
    text: string;
    startS: number;
    endS: number;
    loop: boolean;
  };
  answers: {
    image?: {
      position: AbsolutePosition;
      W2HRatio: number;
      coded: string;
    };
    text?: string;
  };
};

export interface InfoSlide {
  type: SlideType.info;
  content: string;
}

export interface BreakSlide {
  type: SlideType.break;
}

export interface RoundSlide {
  type: SlideType.round;
  name?: string;
  number: number;
}

export interface ResultSlide {
  type: SlideType.result;
}
