import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import {
  matchThree,
  matchThreeMiddleware,
  startMatchThreeMiddleware,
} from "../match-three";

const reducer = combineReducers({
  matchThree: matchThree.reducer,
});

const middleware = [...matchThreeMiddleware];

const store = configureStore({
  reducer,
  middleware,
});

startMatchThreeMiddleware();

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
