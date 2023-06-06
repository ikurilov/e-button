import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EditorState, Slide, SlideType } from './editor.state';

export const editorActions = createActionGroup({
  source: 'Editor',
  events: {
    setFolder: props<{ path: string }>(),
    setTitle: props<{ title: string }>(),
    addSlide: props<{ slideType: SlideType }>(),
    addSlideWithImage: props<{ imageCoded: string; takenFrom: string }>(),
    addImageToSlide: props<{ imageCoded: string }>(),
    updateSlide: props<{ slideIndex: number; slide: Slide }>(),
    deleteSlide: props<{ slideIndex: number }>(),
    moveSlide: props<{ slideIndex: number; newIndex: number }>(),
    saveToFile: emptyProps(),
    loadFromFile: props<{ state: EditorState }>(),
    ok: emptyProps(),
    setCurrentSlide: props<{ index: number }>(),
  },
});
