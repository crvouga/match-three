import { delay, take, put, fork, select } from "redux-saga/effects";
import actions from "./actions";
import * as R from "ramda";
import * as selectors from "./selectors";
import { makeItem } from "./reducer";

const swapIndexes = (index1, index2, board) =>
  R.pipe(
    R.assocPath(index1, R.path(index2, board)),
    R.assocPath(index2, R.path(index1, board))
  )(board);

const isAdjacentIndexes = R.pipe(
  R.zipWith(R.subtract),
  R.sum,
  Math.abs,
  (_) => 0 < _ && _ <= 1
);

function* dragAndDropSaga() {
  while (true) {
    const { payload: grabbed } = yield take(actions.grab);
    const status = yield select(selectors.status);
    if (status === "collapsing") {
      continue;
    }
    yield put(actions.setSelected(grabbed));
    const { payload: dropped } = yield take(actions.drop);
    yield put(actions.setSelected(null));
    if (dropped.index && isAdjacentIndexes(grabbed.index, dropped.index)) {
      const board = yield select(selectors.board);
      const newBoard = swapIndexes(grabbed.index, dropped.index, board);
      yield put(actions.setBoard(newBoard));
    }
  }
}

const clearColumn = R.pipe(
  R.groupWith(R.eqBy(R.prop("color"))),
  R.chain(R.when((_) => _.length >= 3, R.map(R.always(null))))
);
const clearColumns = R.map(clearColumn);
const clearRows = R.pipe(R.transpose, clearColumns, R.transpose);
const clear = (_) => R.zipWith(R.zipWith(R.and), clearRows(_), clearColumns(_));
const collapse = R.map(R.sort(R.descend(R.isNil)));
const fill = R.map(R.map(R.when(R.isNil, makeItem)));

function* collapseBoardSaga() {
  while (true) {
    yield take(actions.setBoard);
    yield put(actions.setStatus("collapsing"));
    while (true) {
      const board = yield select(selectors.board);
      if (R.equals(board, clear(board))) {
        break;
      }
      yield delay(1000 / 3);
      yield put(actions.setBoard(clear(yield select(selectors.board))));
      yield delay(1000 / 3);
      yield put(actions.setBoard(collapse(yield select(selectors.board))));
      yield delay(1000 / 3);
      yield put(actions.setBoard(fill(yield select(selectors.board))));
    }
    yield put(actions.setStatus());
  }
}

export default function* () {
  yield fork(dragAndDropSaga);
  yield fork(collapseBoardSaga);
}
