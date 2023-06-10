import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EditorState } from './editor.state';
import { Slide, SlideType } from '../../../models/models';

export const editorActions = createActionGroup({
  source: 'Editor',
  events: {
    setFolder: props<{ path: string }>(),
    setTitle: props<{ title: string }>(),
    setViewMode: props<{ viewMode: 'question' | 'answer' | 'edit' }>(),
    addSlide: props<{ slideType: SlideType }>(),
    addSlideWithImage: props<{ imageCoded: string; takenFrom: string }>(),
    addImageToSlide: props<{ imageCoded: string }>(),
    addSlideWithAudio: props<{ audioCoded: string; takenFrom: string }>(),
    updateSlide: props<{ slideIndex: number; slide: Slide }>(),
    deleteSlide: props<{ slideIndex: number }>(),
    moveSlide: props<{ slideIndex: number; newIndex: number }>(),
    saveToFile: emptyProps(),
    loadFromFile: props<{ state: EditorState }>(),
    ok: emptyProps(),
    setCurrentSlide: props<{ index: number }>(),
  },
});
