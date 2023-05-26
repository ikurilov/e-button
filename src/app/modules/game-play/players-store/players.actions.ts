import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PlayerEntity } from './players.state';
import {
  HostToPlayerMessage,
  HostToPlayerMessageType,
  PlayerToHostMessage,
} from '../../../../../shared/models/socket-messages.model';
import { SyncInfo } from '../../../core/services/electron/synchronization.service';
import { TeamColors } from '../store/game-play.state';

export const playersActions = createActionGroup({
  source: 'Player Entity',
  events: {
    'Join Player': props<{ id: string; name: string; icon?: string }>(),
    'Create Player': props<{ id: string; name: string; icon?: string }>(),
    'Sync Player': props<{ id: string }>(),
    'Player Message': props<{ message: PlayerToHostMessage }>(),
    'Send Message': props<{ message: HostToPlayerMessage; id?: string }>(),
    'Send Message Ok': emptyProps(),
    'Delete Player': props<{ id: string }>(),
    'Update Player Name': props<{ id: string; name: string }>(),
    'Update Player Team': props<{ id: string; team: TeamColors }>(),
    'Update Player Icon': props<{ id: string; icon: string }>(),
    'Apply Update': props<{ entity: PlayerEntity }>(),
    'Update Player Online': props<{ id: string; online: boolean }>(),
    'Update Player Ping': props<{ id: string; pingMS: number }>(),
    'Update Player Sync Info': props<{ id: string; syncInfo: SyncInfo }>(),
    'Player Pushed Button': props<{ player: PlayerEntity; date: Date }>(),
    'Check Ping': emptyProps(),
    Ok: emptyProps(),
    // 'Actualize Players': emptyProps(),
  },
});
