import React from "react";
import ReactDom from "react-dom";
import { storeStateMiddleWare } from "./middleware/storeStateMiddleWare";
import rootReducer from "./reducers";
import injectGlobalCssRules from "./styles/injectGlobalCssRules";
injectGlobalCssRules();

// Reduc stuff
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

// Routing stuff
import createBrowserHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
import {
  Switch,
  Router,
  Route,
  hashHistory,
  browserHistory
} from "react-router";

// Project stuff
import App from "./components/App";
import { alert } from "./actions/alert";
import Home from "./components/views/home/Home";
import Ranking from "./components/views/Ranking";
import NewGame from "./components/views/new-game/NewGame";
import NotFound from "./components/views/NotFound";

let initialState;
if (localStorage && localStorage.getItem("player")) {
  initialState = {
    state: {
      player: JSON.parse(localStorage.getItem("player"))
    }
  };
} else {
  initialState = {
    state: {
      player: {
        nickname: ""
      }
    }
  };
}

const history = createBrowserHistory();

const routingMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ state: rootReducer, routing: routerReducer }),
  initialState,
  composeEnhancers(applyMiddleware(thunk, routingMiddleware))
);

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/new-game" component={NewGame} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("tetris")
);

store.dispatch(alert("Soon, will be here a fantastic Tetris ..."));

export { history, store };
