import {createFeatureSelector, createSelector} from "@ngrx/store";
import {EditorState} from "./editor.state";

const editorSelector = createFeatureSelector<EditorState>('editor');

export const selectEditor = createSelector(
  editorSelector,
  (editor) => editor
);


