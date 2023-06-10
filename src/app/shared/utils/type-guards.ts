import { QuestionWithAudioSlide, QuestionWithImageSlide, Slide } from '../../models/models';

export const isQuestionWithImageSlide = (slide: Slide): slide is QuestionWithImageSlide => slide.type === 'questionWithImage';
export const isQuestionWithAudioSlide = (slide: Slide): slide is QuestionWithAudioSlide => slide.type === 'questionWithAudio';
