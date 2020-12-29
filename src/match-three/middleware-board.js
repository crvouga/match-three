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
const { setSelected, setStatus, setBoard } = actions;
const { status, board } = selectors;

function* cascadeSaga() {
  while (true) {
    yield put(setStatus(undefined));

    yield take(setBoard);

    yield put(setStatus("collapsing"));

    while (true) {
      if (isStable(yield select(board))) {
        break;
      }

      yield delay(1000 / 3);

      yield put(setBoard(clear(yield select(board))));

      yield delay(1000 / 3);

      yield put(setBoard(collapse(yield select(board))));

      yield delay(1000 / 3);

      yield put(setBoard(fill(yield select(board))));
    }
  }
}

function* swapSaga() {
  while (true) {
    const { payload: first } = yield take(actions.select);

    if (yield select(status) === "collapsing") {
      continue;
    }

    yield put(setSelected(first));

    const { payload: second } = yield take(actions.select);

    if (second.index && isAdjacentIndexes(first.index, second.index)) {
      const previousBoard = yield select(board);

      const nextBoard = swapIndexes(
        first.index,
        second.index,
        yield select(board)
      );

      yield put(setBoard(nextBoard));

      if (isStable(nextBoard)) {
        yield delay(500);

        yield put(setBoard(previousBoard));
      }
    }

    yield put(setSelected(undefined));
  }
}

function* initialSaga() {
  const initialBoard = makeBoard();

  const emptyBoard = initialBoard.map((column) => column.map((item) => null));

  yield put(setBoard(emptyBoard));

  yield delay(500);

  yield put(setBoard(initialBoard));
}

export function* boardSaga() {
  yield* [fork(initialSaga), fork(swapSaga), fork(cascadeSaga)];
}
