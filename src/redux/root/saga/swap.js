import * as R from "ramda";
import { put, select, take } from "redux-saga/effects";
import actions from "../actions";
import * as selectors from "../selectors";

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

export default function* () {
  while (true) {
    const { payload: first } = yield take(actions.select);
    const status = yield select(selectors.status);
    if (status === "collapsing") {
      continue;
    }
    yield put(actions.setSelected(first));
    const { payload: second } = yield take(actions.select);

    if (second.index && isAdjacentIndexes(first.index, second.index)) {
      const board = yield select(selectors.board);
      const newBoard = swapIndexes(first.index, second.index, board);
      yield put(actions.setBoard(newBoard));
    }
    yield put(actions.setSelected(null));
  }
}
