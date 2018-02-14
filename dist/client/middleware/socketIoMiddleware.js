'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _reactRouterRedux = require('react-router-redux');

var _actionsTypes = require('../../actionsTypes');

var _roomsName = require('../../roomsName');

var _party = require('../actions/party');

var _partyList = require('../actions/partyList');

var _player = require('../actions/player');

var _rankings = require('../actions/rankings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roomHandler = function roomHandler(socket, action, dispatch, getState) {
  if (action.type !== _actionsTypes.LOCATION_CHANGE) return;
  var routingState = getState().routing;

  if (getState().party._id) {
    dispatch((0, _party.leaveParty)());
  }

  switch (action.payload.pathname) {
    case '/ranking':
      socket.emit('action', (0, _rankings.getRankingList)());
      break;
    case '/party-list':
      socket.emit('action', (0, _partyList.getParties)());
      break;
    case '/create-party':
      dispatch((0, _party.updateParty)({ size: 10 }));
      break;
    case '/':
      {
        if (action.payload.hash[0] === '#' && action.payload.hash.length > 1) {
          var _action$payload$hash$ = action.payload.hash.split('['),
              _action$payload$hash$2 = (0, _slicedToArray3.default)(_action$payload$hash$, 2),
              roomName = _action$payload$hash$2[0],
              playerNickname = _action$payload$hash$2[1];

          if (!(0, _party.validatePartyHash)(action.payload.hash)) {
            dispatch((0, _reactRouterRedux.push)('/'));
            break;
          }
          playerNickname = playerNickname.substring(0, playerNickname.length - 1);
          dispatch((0, _player.getPlayer)());
          dispatch((0, _party.getParty)());
          var state = getState();
          var player = state.player && state.player.nickname && (0, _extends3.default)({}, state.player, {
            nickname: playerNickname
          });
          var party = state.party;
          party.name = roomName.substring(1);
          dispatch((0, _party.joinParty)(party, player));
        }
        break;
      }
    default:
      break;
  }
};

var socketIoMiddleWare = function socketIoMiddleWare(socket) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;

    if (socket) socket.on('action', function (action) {
      dispatch(action);
    });

    return function (next) {
      return function (action) {
        roomHandler(socket, action, dispatch, getState);

        if (socket && action.type && action.type.indexOf('server/') === 0) socket.emit('action', action);
        return next(action);
      };
    };
  };
};

exports.default = socketIoMiddleWare;