import { fork } from "redux-saga/effects";
import cascadeSaga from "./cascade";
import swapSaga from "./swap";

export default function* () {
  yield* [fork(swapSaga), fork(cascadeSaga)];
}
