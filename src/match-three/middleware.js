import createSagaMiddleware from "redux-saga";
import { boardSaga } from "./middleware-board";

const sagaMiddleware = createSagaMiddleware();

export const matchThreeMiddleware = [sagaMiddleware];

export const startMatchThreeMiddleware = () => {
  sagaMiddleware.run(boardSaga);
};
