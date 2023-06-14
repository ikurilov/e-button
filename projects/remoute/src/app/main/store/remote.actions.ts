import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConnectInfo } from './remote.state';
import {
  Fight,
  GamePlayState,
} from '../../../../../../src/app/modules/game-play/store/game-play.state';
import { QuestionWithImageSlide } from '../../../../../../src/app/modules/editor/state/editor.state';

export const remoteActions = createActionGroup({
  source: 'Remote',
  events: {
    'Info Slide Message': props<{ content: string }>(),
    'Break Slide Message': emptyProps(),
    'Result Slide Message': props<{ score: GamePlayState['score'] }>(),
    'Connect Info Message': props<{ data: ConnectInfo }>(),
    'Image Question Message': props<{
      data: Omit<QuestionWithImageSlide, 'images'>;
    }>(),
    'Question Images loaded': props<{
      slide: QuestionWithImageSlide;
    }>(),
    'Countdown Message': emptyProps(),
    'Ask Message': emptyProps(),
    'Start Fight Message': props<{ data: Fight }>(),
    'Add Player To Fight Message': props<{ data: Fight['pushes'][0] }>(),
    'Question Listening Message': props<{
      data: GamePlayState['questionAnswerState'];
    }>(),
    'Question Verdict Message': props<{
      data: GamePlayState['questionAnswerState'];
    }>(),
    'Question Answer Message': emptyProps(),
  },
});
