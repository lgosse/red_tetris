'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = exports.store = exports.socket = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _injectGlobalCssRules = require('./styles/injectGlobalCssRules');

var _injectGlobalCssRules2 = _interopRequireDefault(_injectGlobalCssRules);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

var _socketIoMiddleware = require('./middleware/socketIoMiddleware');

var _socketIoMiddleware2 = _interopRequireDefault(_socketIoMiddleware);

var _effectsMiddleware = require('./middleware/effectsMiddleware');

var _effectsMiddleware2 = _interopRequireDefault(_effectsMiddleware);

var _gameMiddleware = require('./middleware/gameMiddleware');

var _gameMiddleware2 = _interopRequireDefault(_gameMiddleware);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _params = require('../../params');

var _params2 = _interopRequireDefault(_params);

var _player = require('./actions/player');

var _partyList = require('./actions/partyList');

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./containers/views/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Ranking = require('./containers/views/Ranking');

var _Ranking2 = _interopRequireDefault(_Ranking);

var _NewGame = require('./containers/views/NewGame');

var _NewGame2 = _interopRequireDefault(_NewGame);

var _NotFound = require('./containers/views/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _CreateParty = require('./containers/views/CreateParty');

var _CreateParty2 = _interopRequireDefault(_CreateParty);

var _Party = require('./containers/views/Party');

var _Party2 = _interopRequireDefault(_Party);

var _PartyList = require('./containers/views/PartyList');

var _PartyList2 = _interopRequireDefault(_PartyList);

var _Game = require('./containers/game/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _injectGlobalCssRules2.default)();

// Reduc stuff


// Routing stuff


// Project stuff
var socket = exports.socket = (0, _socket2.default)(_params2.default.server.url);

var initialState = {};

var history = (0, _createBrowserHistory2.default)();

var routingMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var store = exports.store = (0, _redux.createStore)((0, _redux.combineReducers)((0, _extends3.default)({}, _reducers2.default, { routing: _reactRouterRedux.routerReducer })), initialState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, routingMiddleware, _effectsMiddleware2.default, _gameMiddleware2.default, (0, _socketIoMiddleware2.default)(socket))));

var checkNickname = function checkNickname() {
  var player = store.getState().player;
  return Boolean(player.nickname);
};

var checkHash = function checkHash() {
  return window.location.hash.length > 1;
};

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterRedux.ConnectedRouter,
    { history: history },
    _react2.default.createElement(
      _App2.default,
      null,
      _react2.default.createElement(
        _reactRouter.Switch,
        null,
        _react2.default.createElement(_reactRouter.Route, {
          exact: true,
          path: '/',
          render: function render() {
            return checkHash() ? _react2.default.createElement(_Party2.default, null) : _react2.default.createElement(_Home2.default, null);
          }
        }),
        _react2.default.createElement(_reactRouter.Route, { path: '/test', component: _Game2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/ranking', component: _Ranking2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/new-game', component: _NewGame2.default }),
        _react2.default.createElement(_reactRouter.Route, {
          path: '/create-party',
          render: function render() {
            return checkNickname() ? _react2.default.createElement(_CreateParty2.default, null) : _react2.default.createElement(_reactRouter.Redirect, { to: '/new-game' });
          }
        }),
        _react2.default.createElement(_reactRouter.Route, {
          path: '/party-list',
          render: function render() {
            return checkNickname() ? _react2.default.createElement(_PartyList2.default, null) : _react2.default.createElement(_reactRouter.Redirect, { to: '/new-game' });
          }
        }),
        _react2.default.createElement(_reactRouter.Route, { component: _NotFound2.default })
      )
    )
  )
), document.getElementById('tetris'));

store.dispatch((0, _player.getPlayer)());

exports.history = history;