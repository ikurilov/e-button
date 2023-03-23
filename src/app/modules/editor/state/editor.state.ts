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
}

export interface QuestionWithImageSlide {
  type: SlideType.questionWithImage;
  points: number;
  toxic: boolean;
  imageCoded: string;
  text?: string;
  patches: {
    leftInPercent: number;
    topInPercent: number;
    widthInPercent: number;
    heightInPercent: number;
    text?: string;
  }[];
}

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
