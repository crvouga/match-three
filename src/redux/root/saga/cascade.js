import * as R from "ramda";
import { delay, put, select, take } from "redux-saga/effects";
import actions from "../actions";
import { clear, collapse, fill } from "../reducer";
import * as selectors from "../selectors";

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
