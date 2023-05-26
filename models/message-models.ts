import { TeamColors } from '../src/app/modules/game-play/store/game-play.state';
import { PClientState } from '../projects/p-client/src/app/state/p-client.state';

export type serverToPClientMessage =
  // | {
  //     type: 'WHO_ARE_YOU';
  //   }
  | {
      type: 'PING';
    }
  | {
      type: 'ANSWER_RESULT';
      result: boolean;
      team: TeamColors;
    }
  | {
      type: 'PLAYER_STATE';
      data: PClientState;
    };

export type pClientToServerMessage =
  | {
      type: 'UPDATE_ME';
      data: { name: string; team?: TeamColors; id: string };
    }
  | {
      type: 'ANSWER_PUSH';
      data: { team: TeamColors };
    };
