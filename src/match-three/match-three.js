import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

/* 


*/

const slice = (state) => state.matchThree;
const board = createSelector([slice], R.prop("board"));
const columnCount = createSelector([board], R.length);
const rowCount = createSelector([board], R.pipe(R.head, R.length));
const selected = createSelector([slice], R.prop("selected"));

const selectors = {
  board,
  columnCount,
  rowCount,
  selected,
};

/*


*/

const actions = {
  setBoard: createAction("SET_BOARD"),
  setSelected: createAction("SET_SELECTED"),
  //
  select: createAction("SELECT"),
};

/* 


*/

const reducer = createReducer(
  {
    board: null,
    selected: null,
    status: null,
  },
  {
    [actions.setBoard]: (state, action) => {
      state.board = action.payload;
    },
    [actions.setSelected]: (state, action) => {
      state.selected = action.payload;
    },
  }
);

/* 


*/

export const matchThree = {
  reducer,
  actions,
  selectors,
};
