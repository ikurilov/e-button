import { initialEditorState, SlideType } from './editor.state';
import { editorActions } from './editor.actions';
import { createReducer, on } from '@ngrx/store';

export const editorReducer = createReducer(
  initialEditorState,
  on(editorActions.setfolder, (state, { path }) => ({
    ...state,
    folderPath: path,
  })),
  on(editorActions.loadfromfile, (state, { state: newState }) => ({ ...state, ...newState })),
  on(editorActions.settitle, (state, { title }) => ({
    ...state,
    title,
  })),
  on(editorActions.addslide, (state, { slideType }) => {
    switch (slideType) {
      // todo: add other slide types
      case SlideType.questionWithImage:
        return {
          ...state,
          slides: [
            ...state.slides,
            {
              type: SlideType.questionWithImage,
              images: [],
              points: 10,
              toxic: false,
              patches: [],
            },
          ],
        };
      case SlideType.info:
        return {
          ...state,
          slides: [...state.slides, { type: SlideType.info, content: '' }],
        };
      case SlideType.break:
        return {
          ...state,
          slides: [...state.slides, { type: SlideType.break }],
        };
      case SlideType.round:
        return {
          ...state,
          slides: [
            ...state.slides,
            {
              type: SlideType.round,
              number:
                state.slides.filter((s) => s.type === SlideType.round).length +
                1,
            },
          ],
        };
      case SlideType.result:
        return {
          ...state,
          slides: [...state.slides, { type: SlideType.result }],
        };
    }
  }),

  on(editorActions.addslidewithimage, (state, { imageCoded, takenFrom }) => ({
      ...state,
      slides: [
        ...state.slides,
        {
          type: SlideType.questionWithImage,
          images: [
            {
              position: { left: 5, top: 5, width: 50, height: 50 },
              takenFrom,
              W2HRatio: 1,
              imageSource: imageCoded,
            },
          ],
          points: 10,
          toxic: false,
          patches: [],
        },
      ],
    })),

  on(editorActions.addslidewithaudio, (state, { audioCoded, takenFrom }) => ({
      ...state,
      slides: [
        ...state.slides,
        {
          type: SlideType.questionWithAudio,
          audio: {
            audioCoded,
            takenFrom,
          },
          question: {
            start: 0,
            end: 999,
            loop: false,
          },
          answer: {
            start: 2,
            end: 5,
            loop: false,
          },
          points: 10,
          toxic: false,
          patches: [],
        },
      ],
    })),

  on(editorActions.updateslide, (state, { slideIndex, slide }) => {
    const slides = [...state.slides];
    slides[slideIndex] = slide;
    return { ...state, slides };
  }),
  on(editorActions.deleteslide, (state, { slideIndex }) => {
    const slides = [...state.slides];
    slides.splice(slideIndex, 1);
    return { ...state, currentSlideIndex: null, slides };
  }),
  on(editorActions.moveslide, (state, { slideIndex, newIndex }) => {
    const slides = [...state.slides];
    const slide = slides[slideIndex];
    slides.splice(slideIndex, 1);
    slides.splice(newIndex, 0, slide);
    return { ...state, slides, currentSlideIndex: newIndex };
  }),
  on(editorActions.setcurrentslide, (state, { index }) => ({ ...state, currentSlideIndex: index })),
  on(editorActions.setviewmode, (state, { viewMode }) => ({ ...state, viewMode })),
);
