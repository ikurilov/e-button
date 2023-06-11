import { EditorState, Slide } from '../../editor/state/editor.state';
import { PlayerEntity } from '../players-store/players.state';

export interface GamePlayState {
  allGame: EditorState;
  currentSlideIndex: number;
  currentSlide: Slide;
  playPhase: PlayPhases;
  questionAnswerState?: {
    date: Date;
    answeringTeam: TeamColors;
    answerResult?: { type: 'CORRECT' | 'WRONG'; delta: number };
  };
  currentFight?: Fight;
  fightList: Fight[];
  gameConfig?: {
    availableTeams: TeamColors[];
    fightDurationMS: number;
    listeningDurationMS: number;
    accuracyMS: number;
    accuracyIterations: number;
    buttonThrottleMS: number;
    countdownDurationMS: number;
    freezeTimeMS: number;
  };
  score: { [team in TeamColors]: number };
}

export interface Fight {
  askDurationMS?: number;
  questionNumber: number;
  pushes: { date: Date; player: PlayerEntity }[];
  winner?: PlayerEntity;
}

export enum PlayPhases {
  SIMPLE = 'SIMPLE',
  QUESTION_TITLE = 'QUESTION_TITLE',
  QUESTION_COUNTDOWN = 'QUESTION_COUNTDOWN',
  QUESTION_ASK = 'QUESTION_ASK',
  QUESTION_FIGHT = 'QUESTION_FIGHT',
  QUESTION_LISTENING = 'QUESTION_LISTENING',
  QUESTION_VERDICT = 'QUESTION_VERDICT',
  QUESTION_ANSWER_SHOW = 'QUESTION_ANSWER_SHOW',
}

export enum TeamColors {
  PURPLE = 'PURPLE',
  YELLOW = 'YELLOW',
  CYAN = 'CYAN',
  AMBER = 'AMBER',
}
