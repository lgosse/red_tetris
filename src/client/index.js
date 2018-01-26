import React from "react";
import ReactDom from "react-dom";
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
  Redirect,
  Route,
  hashHistory,
  browserHistory
} from "react-router";

// Project stuff
import socketIoMiddleware from "./middleware/socketIoMiddleware";
import io from "socket.io-client";
import params from "../../params";

const socket = io(params.server.url);

import { getPlayer } from "./actions/player";
import { getParties } from "./actions/partyList";
import App from "./containers/App";
import Home from "./containers/views/Home";
import Ranking from "./containers/views/Ranking";
import NewGame from "./containers/views/NewGame";
import NotFound from "./containers/views/NotFound";
import CreateParty from "./containers/views/CreateParty";

import PartyList from "./containers/views/PartyList";

let initialState = {};

const history = createBrowserHistory();

const routingMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ state: rootReducer, routing: routerReducer }),
  initialState,
  composeEnhancers(
    applyMiddleware(thunk, routingMiddleware, socketIoMiddleware(socket))
  )
);

const checkNickname = () => {
  const player = store.getState().state.player;
  return Boolean(player.nickname);
};

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/new-game" component={NewGame} />
          <Route
            path="/create-party"
            render={() => {
              return checkNickname() ? (
                <CreateParty />
              ) : (
                <Redirect to="/new-game" />
              );
            }}
          />
          <Route
            path="/party-list"
            render={() => {
              return checkNickname() ? (
                <PartyList />
              ) : (
                <Redirect to="/new-game" />
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("tetris")
);

store.dispatch(getPlayer());

export { history };
