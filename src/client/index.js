import React from "react";
import ReactDom from "react-dom";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import reducers from "./reducers";
import App from "./components/App";
import { alert } from "./actions/alert";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
import { Route } from "react-router";

const history = createHistory();

const appRouterMiddleware = routerMiddleware(history);

const initialState = {};

const store = createStore(
  combineReducers({ ...reducers }),
  initialState,
  applyMiddleware(thunk, createLogger(), appRouterMiddleware)
);

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("tetris")
);

store.dispatch(alert("Soon, will be here a fantastic Tetris ..."));

export { history, store };
