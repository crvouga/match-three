import { not } from "ramda";
import { delay, fork, put, select, take } from "redux-saga/effects";
import {
  clear,
  collapse,
  fill,
  isAdjacentIndexes,
  isStable,
  makeBoard,
  swapIndexes,
} from "./board";
import { matchThree } from "./match-three";

const { actions, selectors } = matchThree;
const { setBoard, move } = actions;
const { board } = selectors;

function* swapFlow() {
  const {
    payload: [index1, index2],
  } = yield take(move);

  if (isAdjacentIndexes(index1, index2)) {
    const previousBoard = yield select(board);

    const nextBoard = swapIndexes(index1, index2, yield select(board));

    yield put(setBoard(nextBoard));

    if (isStable(nextBoard)) {
      yield delay(1000 / 3);

      yield put(setBoard(previousBoard));
    }
  }
}

function* cascadeFlow() {
  while (not(isStable(yield select(board)))) {
    yield delay(1000 / 3);

    const cleared = clear(yield select(board));

    yield put(setBoard(cleared));

    yield delay(1000 / 3);

    const collapsed = collapse(yield select(board));

    yield put(setBoard(collapsed));

    yield delay(1000 / 3);

    const filled = fill(yield select(board));

    yield put(setBoard(filled));
  }
}

function* cascadeSaga() {
  while (true) {
    yield* cascadeFlow();

    yield* swapFlow();
  }
}

function* initialSaga() {
  const emptyBoard = [[]];

  yield put(setBoard(emptyBoard));

  yield delay(1000);

  const initialBoard = makeBoard();

  yield put(setBoard(initialBoard));
}

export function* boardSaga() {
  yield* initialSaga();
  yield fork(cascadeSaga);
}
