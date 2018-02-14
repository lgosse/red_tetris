'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require('../../../actionsTypes');

var _utils = require('./utils');

var _board = require('../../actions/game/board');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  grid: (0, _utils.gridZero)(10, 20),
  ending: false,
  end: false,
  lines: null,
  winner: null,
  focus: false,
  hasFocusedOnce: false
};

var board = function board() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _extends3.default)({}, initialState);
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.GAME_BOARD_UPDATE:
      return (0, _extends3.default)({}, state, action.board);

    case _actionsTypes.GAME_BOARD_DELETE_LINES:
      {
        if (state.lines !== null) {
          var newGrid = (0, _utils.deleteLinesF)(state.grid, state.lines);
          return (0, _extends3.default)({}, state, {
            grid: newGrid,
            lines: null
          });
        }

        return state;
      }

    case _actionsTypes.GAME_LOSE:
      {
        return (0, _extends3.default)({}, state, {
          ending: true,
          lines: null
        });
      }

    case _actionsTypes.PARTY_LEFT:
      return initialState;

    case _actionsTypes.PARTY_START:
      return (0, _extends3.default)({}, state, {
        grid: (0, _utils.gridZero)(10, 20),
        ending: false,
        end: false,
        lines: null,
        focus: false,
        hasFocusedOnce: false
      });

    case _actionsTypes.GAME_HAS_FOCUS:
      return (0, _extends3.default)({}, state, {
        hasFocusedOnce: true,
        focus: true
      });

    case _actionsTypes.GAME_LOSE_FOCUS:
      return (0, _extends3.default)({}, state, {
        focus: false
      });

    default:
      return state;
  }
};

exports.default = board;