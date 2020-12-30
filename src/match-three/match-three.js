import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import * as R from "ramda";

export const Status = {
  COLLAPSING: "COLLAPSING",
};

/* 


*/

const slice = (state) => state.matchThree;
const board = createSelector([slice], (slice) => slice.board);
const columnCount = createSelector([board], R.length);
const rowCount = createSelector([board], R.pipe(R.head, R.length));
const grabbed = createSelector([slice], (slice) => slice.grabbed);
const status = createSelector([slice], (slice) => slice.status);
const selectors = {
  board,
  columnCount,
  rowCount,
  grabbed,
  status,
};

/*


*/

const actions = {
  setBoard: createAction("[match-three] SET_BOARD"),
  setGrabbed: createAction("[match-three] SET_GRABBED"),
  setStatus: createAction("[match-three] SET_STATUS"),
  //
  grab: createAction("[match-three] GRAB"),
  drop: createAction("[match-three] DROP"),
};

/* 


*/

const reducer = createReducer(
  {
    board: undefined,
    grabbed: undefined,
    status: undefined,
  },
  {
    [actions.setBoard]: (state, action) => {
      state.board = action.payload;
    },
    [actions.setGrabbed]: (state, action) => {
      state.grabbed = action.payload;
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
