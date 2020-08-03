import * as R from "ramda";
import { delay, put, select, take } from "redux-saga/effects";
import actions from "../actions";
import { makeItem } from "../reducer";
import * as selectors from "../selectors";

const clearColumn = R.pipe(
  R.groupWith(R.eqBy(R.prop("color"))),
  R.chain(R.when((_) => _.length >= 3, R.map(R.always(null))))
);
const clearColumns = R.map(clearColumn);
const clearRows = R.pipe(R.transpose, clearColumns, R.transpose);
const clear = (_) => R.zipWith(R.zipWith(R.and), clearRows(_), clearColumns(_));
const collapse = R.map(R.sort(R.descend(R.isNil)));
const fill = R.map(R.map(R.when(R.isNil, makeItem)));

export default function* () {
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
