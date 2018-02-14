'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require('../../actionsTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPlayer = function getPlayer() {
  var playerItem = localStorage.getItem('player');
  if (playerItem) return playerItem;

  return '';
};

var savePlayer = function savePlayer(action) {
  localStorage.setItem('player', action.player.nickname);
};

var player = function player() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.PLAYER_UPDATE:
      {
        return (0, _extends3.default)({}, state, action.player);
      }

    case _actionsTypes.PLAYER_SAVE:
      {
        savePlayer(action);
        return state;
      }

    case _actionsTypes.PLAYER_GET:
      {
        return (0, _extends3.default)({}, state, {
          nickname: getPlayer()
        });
      }

    default:
      {
        return state;
      }
  }
};

exports.default = player;