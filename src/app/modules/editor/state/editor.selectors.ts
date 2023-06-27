import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorState } from './editor.state';

const editorSelector = createFeatureSelector<EditorState>('editor');

export const selectEditor = createSelector(editorSelector, (editor) => editor);

export const selectCurrentSlide = createSelector(editorSelector, (editor) => {
  if (typeof editor.currentSlideIndex !== 'number') {
    return null;
  }
  return {
    slide:
      editor.slides[
        editor.currentSlideIndex >= editor.slides.length
          ? editor.slides.length - 1
          : editor.currentSlideIndex
      ],
    slideIndex: editor.currentSlideIndex,
  };
});

export const selectCurrentSlideStats = createSelector(
  editorSelector,
  (editor) => {
    if (typeof editor.currentSlideIndex !== 'number') {
      return null;
    }
    return {
      slide:
        editor.slides[
          editor.currentSlideIndex >= editor.slides.length
            ? editor.slides.length - 1
            : editor.currentSlideIndex
        ],
      slideIndex: editor.currentSlideIndex,
      orderOfCurrentType: editor.slides
        .slice(0, editor.currentSlideIndex + 1)
        .filter(
          (slide) =>
            slide.type === editor.slides[editor.currentSlideIndex].type,
        ).length,
    };
  },
);

export const selectIsGameEmpty = createSelector(
  editorSelector,
  (editor) => editor?.slides?.length === 0 || editor?.slides === null,
);
