import * as R from "ramda";

export const selected = R.prop("selected");
export const status = R.prop("status");
export const board = R.prop("board");
export const columnCount = R.pipe(board, R.length);
export const rowCount = R.pipe(board, R.head, R.length);
export const indexes = (state) =>
  board(state).flatMap((_, i) => _.map((_, j) => [i, j]));
