export interface EditorState {
  folderPath: string;
  Name: string;
  slides: Slide[];
}

export type Slide = QuestionWithImageSlide | InfoSlide | StartSlide | BreakSlide | ResultSlide;

export enum SlideType {
  questionWithImage = 'questionWithImage',
  info = 'info',
  start = 'start',
  break = 'break',
  result = 'result',
}

export interface QuestionWithImageSlide {
  type: SlideType.questionWithImage;
  points: number;
  toxic: boolean;
  imagePath: string;
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

export interface StartSlide {
  type: SlideType.start;
}

export interface BreakSlide {
  type: SlideType.break;
}

export interface ResultSlide {
  type: SlideType.result;
}

export const initialEditorState: EditorState = {
  folderPath: '',
  Name: '',
  slides: []
}


