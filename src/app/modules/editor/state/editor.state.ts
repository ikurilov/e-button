import { Slide } from '../../../models/models';

export interface EditorState {
  folderPath: string;
  name: string;
  slides: Slide[];
  currentSlideIndex?: number;
  viewMode: 'question' | 'answer' | 'edit';
}

export const initialEditorState: EditorState = {
  folderPath: '',
  name: 'new meme game!',
  slides: [],
  viewMode: 'edit',
};
