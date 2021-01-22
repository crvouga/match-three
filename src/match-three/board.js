import * as R from "ramda";
import { createId, distance, randomNth } from "../utility";

const MATCHING_SIZE = 3;
const BOMB_RADIUS = 1.5;

/* 


*/

export const Colors = {
  Red: "red",
  Blue: "blue",
  Yellow: "yellow",
  Green: "green",
  Purple: "purple",
};
export const COLORS = Object.values(Colors);

const createRandomColor = () => {
  return randomNth(COLORS);
};

export const ItemType = {
  ColorBomb: "ColorBomb",
  RadiusBomb: "RadiusBomb",
  LineBomb: "LineBomb",
};

const createRandomItemType = () => {
  return Math.random() <= 1 / 20 ? randomNth(R.values(ItemType)) : undefined;
};

export const createRandomItem = () => ({
  id: createId(),
  color: createRandomColor(),
  type: createRandomItemType(),
});

export const createRandomBoard = (rowCount = 7, columnCount = 7) =>
  R.times(() => R.times(() => createRandomItem(), columnCount), rowCount);

const mergeColumns = R.zipWith((item1, item2) =>
  R.isNil(item1) || R.isNil(item2) ? null : item1
);

const mergeBoards = R.zipWith(mergeColumns);

const toColumnCount = R.length;

const toRowCount = R.pipe(R.head, R.length);

const toIndexes = R.memoizeWith(
  (board) => R.join(", ", [toColumnCount(board), toRowCount(board)]),
  (board) =>
    R.xprod(R.range(0, toColumnCount(board)), R.range(0, toRowCount(board)))
);
const toIndexesWhere = (predicate, board) =>
  R.filter((index) => predicate(index, R.path(index, board)), toIndexes(board));

const setIndex = (index, value, board) =>
  R.set(R.lensPath(index), value, board);

/* 

clear matchings

*/

const clearColumnMatchings = R.map(
  R.pipe(
    R.groupWith(R.eqBy(R.prop("color"))),
    R.map(
      R.when(
        R.pipe(R.length, R.gte(R.__, MATCHING_SIZE)),
        R.map(R.always(null))
      )
    ),
    R.unnest
  )
);

const clearRowMatchings = R.pipe(
  R.transpose,
  clearColumnMatchings,
  R.transpose
);

const clearMatchings = (board) =>
  mergeBoards(clearRowMatchings(board), clearColumnMatchings(board));

//

const toMatchingIndexes = (board) =>
  toIndexesWhere((index, item) => R.isNil(item), clearMatchings(board));

const toRowMatchingIndexes = (board) =>
  toIndexesWhere((index, item) => R.isNil(item), clearRowMatchings(board));

const toColumnMatchingIndexes = (board) =>
  toIndexesWhere((index, item) => R.isNil(item), clearColumnMatchings(board));

/* 

clear radius bombs

*/

const isRadiusBomb = (item) => item.type === ItemType.RadiusBomb;

const toRadiusBombIndexes = (board) =>
  toIndexesWhere((index, item) => isRadiusBomb(item), board);

const clearRadius = (index1, board) =>
  R.reduce(
    (board, index) => setIndex(index, null, board),
    board,
    toIndexesWhere((index2) => distance(index1, index2) <= BOMB_RADIUS, board)
  );

const clearRadiusBombs = (board) =>
  R.reduce(
    (runningBoard, index) => clearRadius(index, runningBoard),
    board,
    R.intersection(toMatchingIndexes(board), toRadiusBombIndexes(board))
  );

/* 

clear same color bombs

*/

const isColorBomb = (item) => item.type === ItemType.ColorBomb;

const toColorBombIndexes = (board) =>
  toIndexesWhere((index, item) => isColorBomb(item), board);

const clearColor = (color, board) =>
  R.map(R.map(R.when((item) => item?.color === color, R.always(null))), board);

const clearColorBombs = (board) =>
  R.reduce(
    (runningBoard, index) =>
      clearColor(R.path(index, board).color, runningBoard),
    board,
    R.intersection(toMatchingIndexes(board), toColorBombIndexes(board))
  );

/* 

clear line bombs

*/

const isLineBomb = (item) => item.type === ItemType.LineBomb;

const toLineBombIndexes = (board) =>
  toIndexesWhere((index, item) => isLineBomb(item), board);

//

const clearColumn = (columnIndex, board) =>
  R.reduce(
    (runningBoard, index) => setIndex(index, null, runningBoard),
    board,
    toIndexesWhere((index) => index[0] === columnIndex, board)
  );

const clearColumnLineBombs = (board) =>
  R.reduce(
    (runningBoard, index) => clearColumn(index[0], runningBoard),
    board,
    R.intersection(toColumnMatchingIndexes(board), toLineBombIndexes(board))
  );

//

const clearRow = (rowIndex, board) =>
  R.reduce(
    (runningBoard, index) => setIndex(index, null, runningBoard),
    board,
    toIndexesWhere((index) => index[1] === rowIndex, board)
  );

const clearRowLineBombs = (board) =>
  R.reduce(
    (runningBoard, index) => clearRow(index[1], runningBoard),
    board,
    R.intersection(toRowMatchingIndexes(board), toLineBombIndexes(board))
  );

/* 

clear board

*/

export const clear = (board) =>
  R.reduce(mergeBoards, board, [
    clearMatchings(board),
    clearRadiusBombs(board),
    clearColorBombs(board),
    clearColumnLineBombs(board),
    clearRowLineBombs(board),
  ]);

/* 


*/

export const collapse = R.map(R.sort(R.descend(R.isNil)));

/* 


*/

export const fill = R.map(R.map(R.when(R.isNil, createRandomItem)));

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
