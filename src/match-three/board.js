import * as R from "ramda";
import uniqid from "uniqid";

const randomNth = R.pipe(R.sortBy(Math.random), R.head);

const COLORS = ["red", "blue", "green", "yellow", "purple"];

export const makeRandomItem = () => ({
  id: uniqid(),
  color: randomNth(COLORS),
});

export const makeBoard = (rowCount = 7, columnCount = 8) =>
  R.times(() => R.times(() => makeRandomItem(), columnCount), rowCount);

const clearColumn = R.pipe(
  R.groupWith(R.eqBy(R.prop("color"))),
  R.chain(R.when((_) => _.length >= 3, R.map(R.always(null))))
);

const clearColumns = R.map(clearColumn);

const clearRows = R.pipe(R.transpose, clearColumns, R.transpose);

export const clear = (_) =>
  R.zipWith(R.zipWith(R.and), clearRows(_), clearColumns(_));

export const collapse = R.map(R.sort(R.descend(R.isNil)));

export const fill = R.map(R.map(R.when(R.isNil, makeRandomItem)));

export const isStable = (board) => R.equals(board, clear(board));

export const stablizeBoard = R.when(
  R.complement(isStable),
  R.pipe(clear, collapse, fill, (_) => stablizeBoard(_))
);

export const swapIndexes = (index1, index2, board) =>
  R.pipe(
    R.assocPath(index1, R.path(index2, board)),
    R.assocPath(index2, R.path(index1, board))
  )(board);

const sqr = (x) => x * x;
const distance = R.pipe(R.zipWith(R.subtract), R.map(sqr), R.sum, Math.sqrt);
export const isAdjacentIndexes = R.pipe(distance, R.equals(1));
