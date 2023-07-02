import { TeamColors } from '../../../../../src/app/modules/game-play/store/game-play.state';

export interface PClientState {
  freezeTime: number;
  phase: PClientPhase;
  teamsInGame: TeamColors[];
  answeringTeam: TeamColors | null;
  answeringResult: boolean | null;
  myName: string;
  myTeam?: TeamColors;
  myIcon?: string;
  id: string;
  throttle: number;
}

export enum PClientPhase {
  PAUSE = 'PAUSE',
  ASKING = 'ASKING',
  ANSWERING = 'ANSWERING',
  ANSWER_RESULT = 'ANSWER_RESULT',
}

export type SyncPatch = Pick<
  PClientState,
  'throttle' | 'freezeTime' | 'teamsInGame' | 'myTeam'
>;
