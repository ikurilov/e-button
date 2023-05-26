import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConnectInfo, QuestionWithImageState } from './remote.state';

export const remoteActions = createActionGroup({
  source: 'Remote',
  events: {
    'Set Default': emptyProps(),
    'Set Break': emptyProps(),
    'Set Info': props<{ data: string[] }>(),
    'Set Connect': props<{ data: ConnectInfo }>(),
    'Set Image Question': props<{ data: QuestionWithImageState }>(),
  },
});
