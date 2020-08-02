import * as R from "ramda";
export const board = (state) => state.game.board;
export const indexes = (state) =>
  board(state).flatMap((_, i) => _.map((_, j) => [i, j]));

export const rowCount = R.pipe(board, R.length);
export const columnCount = R.pipe(board, R.head, R.length);
export const selectedItem = (state) => state.game.selectedItem;
export const status = (state) => state.game.status;
