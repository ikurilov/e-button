export interface EditorState {
  folderPath: string;
  name: string;
  slides: Slide[];
  currentSlideIndex?: number;
}

export type Slide = QuestionWithImageSlide | InfoSlide | BreakSlide;

export enum SlideType {
  questionWithImage = 'questionWithImage',
  info = 'info',
  break = 'break',
  questionWithAudio = 'questionWithAudio',
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
  imageCoded: string;
  images: {
    position: AbsolutePosition;
    W2HRatio: number;
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
  paragraphs: string[];
}

export interface BreakSlide {
  type: SlideType.break;
}

export const initialEditorState: EditorState = {
  folderPath: '',
  name: 'new meme game!',
  slides: [],
};
