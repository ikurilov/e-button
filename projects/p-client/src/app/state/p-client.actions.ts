import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PClientState, SyncPatch } from './p-client.state';
import { TeamColors } from '../../../../../src/app/modules/game-play/store/game-play.state';
import {
  HostToPlayerMessage,
  PlayerToHostMessage,
} from '../../../../../shared/models/socket-messages.model';

export const pClientActions = createActionGroup({
  source: 'PClient',
  events: {
    'start init sequence': emptyProps(),
    'init sequence completed': props<{
      name: string;
      id: string;
      icon?: string;
      // team?: TeamColors;
    }>(),
    'Set State': props<{ data: PClientState }>(),
    'Patch State': props<Partial<PClientState>>(),
    'Send Message': props<{ message: PlayerToHostMessage }>(),
    'Receive Message': props<{ message: HostToPlayerMessage }>(),
    'Sync From Host': props<SyncPatch>(),
    'Send me': props<{ data: PClientState }>(),
    Pong: emptyProps(),
    'Change Name': props<{ name: string }>(),
    // 'Change Name OK': props<{ name: string }>(),
    'Change Team': props<{ team: TeamColors }>(),
    'Change Throttle': props<{ throttle: number }>(),
    // 'Change Team Ok': props<{ team: TeamColors }>(),
    'Push Answer': emptyProps(),
    'Start Answering': props<{ answeringTeam: TeamColors }>(),
    'Answer Result': props<{ result: boolean; team: TeamColors }>(),
    Ok: emptyProps(),
  },
});
