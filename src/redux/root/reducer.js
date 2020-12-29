import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import * as R from "ramda";
import uniqid from "uniqid";

const randomNth = R.pipe(R.sortBy(Math.random), R.head);
const colors = ["red", "blue", "green", "yellow", "purple"];

export const makeItem = () => ({
  id: uniqid(),
  color: randomNth(colors),
});

export const makeGrid = (rowCount, columnCount) =>
  R.times(() => R.times(() => makeItem(), columnCount), rowCount);

const clearColumn = R.pipe(
  R.groupWith(R.eqBy(R.prop("color"))),
  R.chain(R.when((_) => _.length >= 3, R.map(R.always(null))))
);

const clearColumns = R.map(clearColumn);

const clearRows = R.pipe(R.transpose, clearColumns, R.transpose);

export const clear = (_) =>
  R.zipWith(R.zipWith(R.and), clearRows(_), clearColumns(_));

export const collapse = R.map(R.sort(R.descend(R.isNil)));

export const fill = R.map(R.map(R.when(R.isNil, makeItem)));

const stablizeBoard = (board) =>
  R.equals(board, clear(board))
    ? board
    : stablizeBoard(fill(collapse(clear(board))));

const initialBoard = stablizeBoard(makeGrid(7, 8));

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
