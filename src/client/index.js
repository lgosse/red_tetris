import React from 'react';
import ReactDom from 'react-dom';
import reducers from './reducers';
import injectGlobalCssRules from './styles/injectGlobalCssRules';
injectGlobalCssRules();

// Reduc stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// Routing stuff
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';
import {
  Switch,
  Router,
  Redirect,
  Route,
  hashHistory,
  browserHistory
} from 'react-router';

// Project stuff
import socketIoMiddleware from './middleware/socketIoMiddleware';
import effectsMiddleware from './middleware/effectsMiddleware';
import io from 'socket.io-client';
import params from '../../params';

const socket = io(params.server.url);

import { getPlayer } from './actions/player';
import { getParties } from './actions/partyList';
import App from './containers/App';
import Home from './containers/views/Home';
import Ranking from './containers/views/Ranking';
import NewGame from './containers/views/NewGame';
import NotFound from './containers/views/NotFound';
import CreateParty from './containers/views/CreateParty';
import Party from './containers/views/Party';
import PartyList from './containers/views/PartyList';

let initialState = {};

const history = createBrowserHistory();

const routingMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      routingMiddleware,
      effectsMiddleware,
      socketIoMiddleware(socket)
    )
  )
);

const checkNickname = () => {
  const player = store.getState().player;
  return Boolean(player.nickname);
};

const checkHash = () => {
  return window.location.hash.length > 1;
};

import Game from './containers/game/Game';

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return checkHash() ? <Party /> : <Home />;
            }}
          />
          <Route path="/test" component={Game} />
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
  document.getElementById('tetris')
);

store.dispatch(getPlayer());

export { history };
