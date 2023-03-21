import {createFeatureSelector, createSelector} from "@ngrx/store";

const editorSelector = createFeatureSelector('editor');

export const selectEditor = createSelector(
  editorSelector,
  (editor) => editor
);


