import { Slide } from '../../../../../../src/app/modules/editor/state/editor.state';
import {
  Fight,
  GamePlayState,
  PlayPhases,
} from '../../../../../../src/app/modules/game-play/store/game-play.state';

export interface RemoteState {
  playPhases?: PlayPhases;
  connectInfo?: ConnectInfo;
  fight?: Fight;
  slide?: Slide;
  questionAnswerState?: GamePlayState['questionAnswerState'];
}

export interface ConnectInfo {
  qrCode: string;
  teams: { name: string; players: string[] }[];
}

export const initialRemoteState: RemoteState = {};
