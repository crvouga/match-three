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
  Bomb: "bomb",
};

export const COLORS = Object.values(Colors);

const isEmptySlot = R.isNil;

const BOMB_PROABILITY = 0.1;
export const BOMB_RADIUS = 1.5;
export const createRandomItem = () => ({
  id: createId(),
  color: randomNth(COLORS),
  type: Math.random() < BOMB_PROABILITY ? ItemType.Bomb : undefined,
});

export const createRandomBoard = (rowCount = 7, columnCount = 7) =>
  R.times(() => R.times(() => createRandomItem(), columnCount), rowCount);

/* 


*/

const ungroupMatchings = R.unnest;
//
const isValidMatching = R.pipe(R.length, R.gte(R.__, 3));
const clearMatching = R.map(R.always(null));
const clearMatchings = R.map(R.when(isValidMatching, clearMatching));
//
const isMatching = R.eqBy(R.prop("color"));
const groupMatchings = R.groupWith(isMatching);
//
const clearColumn = R.pipe(groupMatchings, clearMatchings, ungroupMatchings);
const clearColumns = R.map(clearColumn);
const clearRows = R.pipe(R.transpose, clearColumns, R.transpose);
//
const mergeColumn = R.zipWith((item1, item2) =>
  R.isNil(item1) || R.isNil(item2) ? null : item1
);
const merge = R.zipWith(mergeColumn);
const mergeAll = (...boards) => R.reduce(merge, R.head(boards), R.tail(boards));

//

export const clearRadius = R.curry((radius, index, board) => {
  return board.map((column, columnIndex) =>
    column.map((item, rowIndex) =>
      distance(index, [columnIndex, rowIndex]) <= radius ? null : item
    )
  );
});

const toColumnCount = R.length;

const toRowCount = R.pipe(R.head, R.length);

const toIndexes = (board) =>
  R.xprod(R.range(0, toColumnCount(board)), R.range(0, toRowCount(board)));

const isBomb = (item) => item.type === ItemType.Bomb;

export const clearBombs = (board) => {
  const clearedRowsAndColumns = R.converge(merge, [clearRows, clearColumns])(
    board
  );

  const bombIndexes = R.pipe(
    toIndexes,
    R.filter(R.pipe(R.path(R.__, board), isBomb))
  )(board);

  const clearedBombIndexes = R.filter(
    R.pipe(R.path(R.__, clearedRowsAndColumns), R.isNil),
    bombIndexes
  );

  const clearedBombs = R.reduce(
    (board, index) => clearRadius(BOMB_RADIUS, index, board),
    board,
    clearedBombIndexes
  );

  return clearedBombs;
};

export const clear = R.converge(mergeAll, [
  clearRows,
  clearColumns,
  clearBombs,
]);
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
