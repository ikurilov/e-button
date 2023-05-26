import {
  PClientState,
  SyncPatch,
} from '../../projects/p-client/src/app/state/p-client.state';
import {
  PlayPhases,
  TeamColors,
} from '../../src/app/modules/game-play/store/game-play.state';
import {
  QuestionWithImageState,
  RemoteScreens,
} from '../../projects/remoute/src/app/main/store/remote.state';

export type HostToScreenMessage =
  | {
      type: RemoteScreens.BREAK;
    }
  | {
      type: RemoteScreens.CONNECT;
      payload: {
        qrCode: string;
        teams: { name: string; players: string[] }[];
      };
    }
  | {
      type: RemoteScreens.INFO;
      payload: string[];
    }
  | {
      type: RemoteScreens.QUESTION;
      payload: QuestionWithImageState;
    };

export enum HostToPlayerMessageType {
  PING = 'PING',
  UPDATE_TEAM = 'UPDATE_TEAM',
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_ICON = 'UPDATE_ICON',
  UPDATE_THROTTLE = 'UPDATE_THROTTLE',
  CURRENT_STATE = 'CURRENT_STATE',
  START_LISTENING = 'START_LISTENING',
  ANSWER_RESULT = 'ANSWER_RESULT',
  SYNC = 'SYNC',
}

export type HostToPlayerMessage =
  | {
      type: HostToPlayerMessageType.PING;
    }
  | {
      type: HostToPlayerMessageType.UPDATE_TEAM;
      payload: {
        team: TeamColors;
      };
    }
  | {
      type: HostToPlayerMessageType.UPDATE_NAME;
      payload: {
        name: string;
      };
    }
  | {
      type: HostToPlayerMessageType.UPDATE_ICON;
      payload: {
        icon: string;
      };
    }
  | {
      type: HostToPlayerMessageType.UPDATE_THROTTLE;
      payload: {
        buttonThrottleMS: number;
      };
    }
  | {
      type: HostToPlayerMessageType.CURRENT_STATE;
      payload: {
        phase: PlayPhases;
      };
    }
  | {
      type: HostToPlayerMessageType.START_LISTENING;
      payload: {
        answeringTeam: TeamColors;
      };
    }
  | {
      type: HostToPlayerMessageType.ANSWER_RESULT;
      payload: {
        team: TeamColors;
        result: boolean;
      };
    }
  | {
      type: HostToPlayerMessageType.SYNC;
      payload: SyncPatch;
    };

export enum PlayerToHostMessageType {
  JOIN = 'JOIN',
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_TEAM = 'UPDATE_TEAM',
  UPDATE_ICON = 'UPDATE_ICON',
  ANSWER_PUSH = 'ANSWER_PUSH',
  PONG = 'PONG',
}
export type PlayerToHostMessage =
  | {
      id: string;
    } & (
      | {
          type: PlayerToHostMessageType.JOIN;
          payload: {
            name: string;
            icon?: string;
          };
        }
      | {
          type: PlayerToHostMessageType.UPDATE_NAME;
          payload: {
            name: string;
          };
        }
      | {
          type: PlayerToHostMessageType.UPDATE_TEAM;
          payload: {
            team: TeamColors;
          };
        }
      | {
          type: PlayerToHostMessageType.UPDATE_ICON;
          payload: {
            icon: string;
          };
        }
      | {
          type: PlayerToHostMessageType.ANSWER_PUSH;
          payload: {
            date: Date;
          };
        }
      | {
          type: PlayerToHostMessageType.PONG;
          payload: {
            date: Date;
          };
        }
    );
