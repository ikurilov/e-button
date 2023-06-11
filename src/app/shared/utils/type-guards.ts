import { QuestionWithAudioSlide, QuestionWithImageSlide, Slide } from '../../modules/editor/state/editor.state';

export const isQuestionWithImageSlide = (slide: Slide): slide is QuestionWithImageSlide => slide.type === 'questionWithImage';
export const isQuestionWithAudioSlide = (slide: Slide): slide is QuestionWithAudioSlide => slide.type === 'questionWithAudio';
