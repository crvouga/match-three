import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";
import { makeBoard } from "./board";

/* 


*/

const slice = (state) => state.matchThree;
const board = createSelector([slice], R.prop("board"));
const columnCount = createSelector([board], R.length);
const rowCount = createSelector([board], R.pipe(R.head, R.length));

const selectors = {
  slice,
  board,
  columnCount,
  rowCount,
  selected: createSelector([slice], R.prop("selected")),
  status: createSelector([slice], R.prop("status")),
  indexes: createSelector([columnCount, rowCount], (columnCount, rowCount) =>
    R.xprod(R.range(0, columnCount), R.range(0, rowCount))
  ),
};

/*


*/

const actions = {
  setBoard: createAction("SET_BOARD"),
  setSelected: createAction("SET_SELECTED"),
  setStatus: createAction("SET_STATUS"),
  //
  drag: createAction("DRAG"),
  grab: createAction("GRAB"),
  drop: createAction("DROP"),
  swap: createAction("SWAP"),
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
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
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
