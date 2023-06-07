import { Pipe, PipeTransform } from '@angular/core';
import { SlideType } from '../../modules/editor/state/editor.state';

@Pipe({
  name: 'slideTypeTitle',
})
export class SlideTypeTitlePipe implements PipeTransform {
  private typeTitles = {
    [SlideType.questionWithImage]: 'Вопрос с картинкой',
    [SlideType.questionWithAudio]: 'Вопрос с аудио',
    [SlideType.info]: 'Информация',
    [SlideType.break]: 'Перерыв',
    [SlideType.round]: 'Раунд',
    [SlideType.result]: 'Результат',
  };

  transform(value: SlideType): string {
    return this.typeTitles[value];
  }
}
