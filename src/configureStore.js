import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import game from "./redux/game";

const rootReducer = {
  game: game.reducer,
};

function* rootSaga() {
  yield* game.saga();
}

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
