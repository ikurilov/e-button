export interface EditorState {
  folderPath: string;
  name: string;
  slides: Slide[];
  currentSlideIndex?: number;
}

export type Slide =
  | QuestionWithImageSlide
  | InfoSlide
  | BreakSlide
  | QuestionWithAudioSlide
  | RoundSlide
  | ResultSlide;

export enum SlideType {
  questionWithImage = 'questionWithImage',
  info = 'info',
  break = 'break',
  questionWithAudio = 'questionWithAudio',
  round = 'round',
  result = 'result',
}

export interface AbsolutePosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface QuestionSlide {
  points: number;
  toxic: boolean;
}

export type QuestionWithImageSlide = QuestionSlide & {
  type: SlideType.questionWithImage;
  images: {
    position: AbsolutePosition;
    takenFrom: string;
    W2HRatio?: number;
    showOnly?: 'question' | 'answer';
    imageSource: string;
  }[];
  text?: string;
  patches: {
    position: AbsolutePosition;
    text?: string;
  }[];
};

export type QuestionWithAudioSlide = QuestionSlide & {
  type: SlideType.questionWithAudio;
  audioCoded: string;
  question: {
    text: string;
    startS: number;
    endS: number;
    loop: boolean;
  };
  answers: {
    image?: {
      position: AbsolutePosition;
      W2HRatio: number;
      coded: string;
    };
    text?: string;
  };
};

export interface InfoSlide {
  type: SlideType.info;
  content: string;
}

export interface BreakSlide {
  type: SlideType.break;
}

export interface RoundSlide {
  type: SlideType.round;
  name?: string;
  number: number;
}

export interface ResultSlide {
  type: SlideType.result;
}

export const initialEditorState: EditorState = {
  folderPath: '',
  name: 'new meme game!',
  slides: [],
};
