import { TeamColors } from '../store/game-play.state';
import { SyncInfo } from '../../../core/services/electron/synchronization.service';

export interface PlayersState {
  list: PlayerEntity[];
}

export interface PlayerEntity {
  id: string;
  // socketId: string;
  online: boolean;
  pingMS: number;
  name: string;
  team?: TeamColors;
  icon?: string;
  syncInfo?: SyncInfo;
  pingRecords: {
    date: Date;
    clientDate: Date;
  }[];
}
