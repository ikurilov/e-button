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
    'Round Slide Message': props<{ number: number }>(),
    'Connect Info Message': props<{ data: ConnectInfo }>(),
    'Clear Connect Info Message': emptyProps(),
    'Image Question Message': props<{
      data: {
        slide: Omit<QuestionWithImageSlide, 'images'>;
        questionNumber: number;
      };
    }>(),
    'Question Images loaded': props<{
      slide: QuestionWithImageSlide;
      questionNumber: number;
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
