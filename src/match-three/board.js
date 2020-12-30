import * as R from "ramda";
import { createId, distance, randomNth } from "../utility";

/* 


*/

export const COLORS = ["red", "blue", "green", "yellow", "purple"];

const isEmptySlot = R.isNil;

export const createRandomItem = () => ({
  id: createId(),
  color: randomNth(COLORS),
});

export const createRandomBoard = (rowCount = 7, columnCount = 8) =>
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
const mergeColumn = R.zipWith(R.and);
const merge = R.zipWith(mergeColumn);
//
export const clear = R.converge(merge, [clearRows, clearColumns]);

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
