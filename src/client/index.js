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
  routerMiddleware
} from 'react-router-redux';
import { Switch, Redirect, Route } from 'react-router';

// Project stuff
import socketIoMiddleware from './middleware/socketIoMiddleware';
import effectsMiddleware from './middleware/effectsMiddleware';
import gameMiddleware from './middleware/gameMiddleware';
import io from 'socket.io-client';
import params from '../../params';

export const socket = io(params.front.url);

import { getPlayer } from './actions/player';
import App from './containers/App';
import Home from './containers/views/Home';
import Ranking from './containers/views/Ranking';
import NewGame from './containers/views/NewGame';
import NotFound from './containers/views/NotFound';
import CreateParty from './containers/views/CreateParty';
import Party from './containers/views/Party';
import PartyList from './containers/views/PartyList';

import { alert } from './actions/alert';

const history = createBrowserHistory();

const routingMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  {},
  composeEnhancers(
    applyMiddleware(
      thunk,
      routingMiddleware,
      effectsMiddleware,
      gameMiddleware,
      socketIoMiddleware(socket)
    )
  )
);

const checkNickname = () => {
  const player = store.getState().player;
  const isNickNameValid = Boolean(player.nickname);
  if (!isNickNameValid) {
    setTimeout(() =>
      store.dispatch(alert('You must enter your player nickname'), 0)
    );
  }
  return isNickNameValid;
};

const checkHash = () => window.location.hash.length > 1;

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (checkHash() ? <Party /> : <Home />)}
          />
          <Route path="/ranking" component={Ranking} />
          <Route path="/new-game" component={NewGame} />
          <Route
            path="/create-game"
            render={() =>
              checkNickname() ? <CreateParty /> : <Redirect to="/new-game" />
            }
          />
          <Route
            path="/game-list"
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
