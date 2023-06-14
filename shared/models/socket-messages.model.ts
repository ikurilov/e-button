import { SyncPatch } from '../../projects/p-client/src/app/state/p-client.state';
import {
  Fight,
  GamePlayState,
  PlayPhases,
  TeamColors,
} from '../../src/app/modules/game-play/store/game-play.state';
import {
  EditorState,
  QuestionWithImageSlide,
} from '../../src/app/modules/editor/state/editor.state';
import { ConnectInfo } from '../../projects/remoute/src/app/main/store/remote.state';

export enum HostToScreenMessageType {
  INFO = 'INFO',
  BREAK = 'BREAK',
  ROUND = 'ROUND',
  RESULT = 'RESET',
  CONNECT_INFO = 'CONNECT_INFO',
  IMAGE_QUESTION = 'IMAGE_QUESTION',
  COUNTDOWN = 'COUNTDOWN',
  ASK = 'ASK',
  START_FIGHT = 'START_FIGHT',
  ADD_PLAYER_TO_FIGHT = 'ADD_PLAYER_TO_FIGHT',
  QUESTION_LISTENING = 'QUESTION_LISTENING',
  QUESTION_VERDICT = 'QUESTION_VERDICT',
  QUESTION_ANSWER = 'QUESTION_ANSWER',
}

export type HostToScreenMessage =
  | {
      type: HostToScreenMessageType.INFO;
      payload: {
        content: string;
      };
    }
  | {
      type: HostToScreenMessageType.BREAK;
    }
  | {
      type: HostToScreenMessageType.ROUND;
      payload: {
        number: number;
      };
    }
  | {
      type: HostToScreenMessageType.RESULT;
      payload: GamePlayState['score'];
    }
  | {
      type: HostToScreenMessageType.CONNECT_INFO;
      payload: ConnectInfo;
    }
  | {
      type: HostToScreenMessageType.IMAGE_QUESTION;
      payload: Omit<QuestionWithImageSlide, 'images'>;
    }
  | {
      type: HostToScreenMessageType.COUNTDOWN;
    }
  | {
      type: HostToScreenMessageType.ASK;
    }
  | {
      type: HostToScreenMessageType.START_FIGHT;
      payload: Fight;
    }
  | {
      type: HostToScreenMessageType.ADD_PLAYER_TO_FIGHT;
      payload: Fight['pushes'][0];
    }
  | {
      type: HostToScreenMessageType.QUESTION_LISTENING;
      payload: GamePlayState['questionAnswerState'];
    }
  | {
      type: HostToScreenMessageType.QUESTION_VERDICT;
      payload: GamePlayState['questionAnswerState'];
    }
  | {
      type: HostToScreenMessageType.QUESTION_ANSWER;
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
