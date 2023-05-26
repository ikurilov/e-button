import { initialEditorState, SlideType } from './editor.state';
import { editorActions } from './editor.actions';
import { createReducer, on } from '@ngrx/store';

export const editorReducer = createReducer(
  initialEditorState,
  on(editorActions.setfolder, (state, { path }) => ({
    ...state,
    folderPath: path,
  })),
  on(editorActions.loadfromfile, (state, { state: newState }) => {
    return { ...state, ...newState };
  }),
  on(editorActions.settitle, (state, { title }) => ({
    ...state,
    title: title,
  })),
  on(editorActions.addslide, (state, { slideType }) => {
    switch (slideType) {
      case SlideType.questionWithImage:
        return {
          ...state,
          slides: [
            ...state.slides,
            {
              type: SlideType.questionWithImage,
              imageCoded: '',
              points: 10,
              toxic: false,
              patches: [],
            },
          ],
        };
      case SlideType.info:
        return {
          ...state,
          slides: [...state.slides, { type: SlideType.info, paragraphs: [] }],
        };
      case SlideType.break:
        return {
          ...state,
          slides: [...state.slides, { type: SlideType.break }],
        };
    }
  }),
  on(editorActions.addslidewithimage, (state, { imageCoded }) => {
    return {
      ...state,
      slides: [
        ...state.slides,
        {
          type: SlideType.questionWithImage,
          imageCoded: imageCoded,
          points: 10,
          toxic: false,
          patches: [],
        },
      ],
    };
  }),
  on(editorActions.updateslide, (state, { slideIndex, slide }) => {
    const slides = [...state.slides];
    slides[slideIndex] = slide;
    return { ...state, slides: slides };
  }),
  on(editorActions.deleteslide, (state, { slideIndex }) => {
    const slides = [...state.slides];
    slides.splice(slideIndex, 1);
    return { ...state, currentSlideIndex: null, slides: slides };
  }),
  on(editorActions.moveslide, (state, { slideIndex, newIndex }) => {
    const slides = [...state.slides];
    const slide = slides[slideIndex];
    slides.splice(slideIndex, 1);
    slides.splice(newIndex, 0, slide);
    return { ...state, slides: slides, currentSlideIndex: newIndex };
  }),
  on(editorActions.setcurrentslide, (state, { index }) => {
    return { ...state, currentSlideIndex: index };
  }),
);
