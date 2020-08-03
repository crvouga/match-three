import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Index from "./react";
import configureStore from "./redux/configureStore";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
