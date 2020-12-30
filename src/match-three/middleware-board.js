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
const { setSelected, setBoard } = actions;
const { board } = selectors;

function* swapFlow() {
  const { payload: first } = yield take(actions.select);

  yield put(setSelected(first));

  const { payload: second } = yield take(actions.select);

  yield put(setSelected(undefined));

  if (second.index && isAdjacentIndexes(first.index, second.index)) {
    const previousBoard = yield select(board);

    const nextBoard = swapIndexes(
      first.index,
      second.index,
      yield select(board)
    );

    yield put(setBoard(nextBoard));

    if (isStable(nextBoard)) {
      yield delay(1000 / 3);

      yield put(setBoard(previousBoard));
    }
  }
}

function* cascadeFlow() {
  while (true) {
    if (isStable(yield select(board))) {
      break;
    }

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
