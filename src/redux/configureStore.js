import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import root from "./root";

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: root.reducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(root.saga);
  return store;
};
