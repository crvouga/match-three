import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import * as R from "ramda";
import uniqid from "uniqid";

const randomNth = R.pipe(R.sortBy(Math.random), R.head);
const colors = ["red", "blue", "green", "yellow", "purple"];

const colorToShape = {
  red: "square",
};

export const makeItem = () => ({
  id: uniqid(),
  color: randomNth(colors),
});

export const makeGrid = (rowCount, columnCount) =>
  R.times(() => R.times(() => makeItem(), columnCount), rowCount);

const initialBoard = makeGrid(7, 8);

export default createReducer(
  {
    board: initialBoard,
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
