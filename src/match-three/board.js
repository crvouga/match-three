import * as R from "ramda";
import { createId, distance, randomNth } from "../utility";

/* 


*/

export const Colors = {
  Red: "red",
  Blue: "blue",
  Yellow: "yellow",
  Green: "green",
  Purple: "purple",
};

export const ItemType = {
  RadiusBomb: "radius-bomb",
};

export const COLORS = Object.values(Colors);

const isEmptySlot = R.isNil;
const MATCHING_SIZE = 3;
const BOMB_PROABILITY = 0.1;
export const BOMB_RADIUS = 1.5;

export const createRandomItem = () => ({
  id: createId(),
  color: randomNth(COLORS),
  type: Math.random() <= BOMB_PROABILITY ? ItemType.RadiusBomb : undefined,
});

const mergeColumn = R.zipWith((item1, item2) =>
  R.isNil(item1) || R.isNil(item2) ? null : item1
);
const merge = R.zipWith(mergeColumn);

const serializeBoard = (board) => JSON.stringify(board);
const memoize = R.memoizeWith(serializeBoard);
export const createRandomBoard = (rowCount = 7, columnCount = 7) =>
  R.times(() => R.times(() => createRandomItem(), columnCount), rowCount);

/* 


*/

const ungroupMatchings = R.unnest;
//
const isValidMatching = R.pipe(R.length, R.gte(R.__, MATCHING_SIZE));
const matchingToClearedMatching = R.map(R.always(null));

//
const isMatching = R.eqBy(R.prop("color"));
const groupMatchings = R.groupWith(isMatching);
//
const clearColumn = R.pipe(
  groupMatchings,
  R.map(R.when(isValidMatching, matchingToClearedMatching)),
  ungroupMatchings
);
const clearColumnMatchings = R.map(clearColumn);
const clearRowMatchings = R.pipe(
  R.transpose,
  clearColumnMatchings,
  R.transpose
);
//

//

const toColumnCount = R.length;

const toRowCount = R.pipe(R.head, R.length);

const toIndexes = R.memoizeWith(
  (board) => R.join(", ", [toColumnCount(board), toRowCount(board)]),
  (board) =>
    R.xprod(R.range(0, toColumnCount(board)), R.range(0, toRowCount(board)))
);

const isRadiusBomb = (item) => item.type === ItemType.RadiusBomb;

const toBombIndexes = (board) =>
  R.pipe(toIndexes, R.filter(R.pipe(R.path(R.__, board), isRadiusBomb)))(board);

const clearMatchings = memoize((board) =>
  merge(clearRowMatchings(board), clearColumnMatchings(board))
);

const toClearedIndexes = (board) =>
  R.pipe(
    toIndexes,
    R.filter(R.pipe(R.path(R.__, clearMatchings(board)), R.isNil))
  )(board);

const toClearedBombIndexes = (board) =>
  R.intersection(toClearedIndexes(board), toBombIndexes(board));

export const clearRadius = R.curry((radius, board, index) =>
  board.map((column, columnIndex) =>
    column.map((item, rowIndex) =>
      distance(index, [columnIndex, rowIndex]) <= radius ? null : item
    )
  )
);

export const clearBombs = (board) =>
  R.reduce(clearRadius(BOMB_RADIUS), board, toClearedBombIndexes(board));

export const clear = (board) => merge(clearMatchings(board), clearBombs(board));

/* 


*/

const collapseColumn = R.sort(R.descend(isEmptySlot));
export const collapse = R.map(collapseColumn);

/* 


*/

const fillColumn = R.map(R.when(isEmptySlot, createRandomItem));
export const fill = R.map(fillColumn);

/* 


*/

export const isStable = R.converge(R.equals, [R.identity, clear]);

/* 


*/

export const swap = R.curry((index1, index2, board) =>
  R.pipe(
    R.assocPath(index1, R.path(index2, board)),
    R.assocPath(index2, R.path(index1, board))
  )(board)
);

/* 


*/

export const isAdjacent = R.pipe(distance, R.equals(1));
