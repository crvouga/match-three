import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";
import { isStable } from "./board";

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
  isStable: createSelector([board], isStable),
};

/*


*/

const actions = {
  setBoard: createAction("[match-three] SET_BOARD"),
  move: createAction("[match-three] MOVE", (index1, index2) => ({
    payload: [index1, index2],
  })),
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
