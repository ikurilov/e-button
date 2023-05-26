import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EditorState } from '../../editor/state/editor.state';
import { TeamColors } from './game-play.state';
import { PlayerEntity } from '../players-store/players.state';

export const gamePlayActions = createActionGroup({
  source: 'GamePlay',
  events: {
    'Init Game From Editor': props<{ game: EditorState }>(),
    'Set Game Config': props<{ availableTeams: TeamColors[] }>(),

    'Change Slide': props<{ slideIndex: number }>(),

    'Start Countdown': emptyProps(),
    'Ask Question': emptyProps(),
    'Player Pushed Button': props<{ player: PlayerEntity; date: Date }>(),
    'Player Pushed Button Ignore': emptyProps(),
    'Start Fight': props<{ player: PlayerEntity; date: Date }>(),
    'Add Player To Fight': props<{ player: PlayerEntity; date: Date }>(),
    'Start listening': emptyProps(),
    'Listening Time Out': emptyProps(),
    'Answer Verdict': props<{
      result: 'CORRECT' | 'WRONG';
      delta: number;
    }>(),
    'Show Answer': emptyProps(),

    Ok: emptyProps(),
  },
});
