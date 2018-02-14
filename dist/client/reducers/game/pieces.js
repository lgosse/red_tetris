'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require('../../../actionsTypes');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

var pieces = function pieces() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.GAME_PIECES_UPDATE:
      {
        return (0, _extends3.default)({}, state, action.pieces);
      }

    case _actionsTypes.GAME_PIECE_UPDATE:
      {
        return (0, _extends3.default)({}, state, {
          piece: (0, _extends3.default)({}, state.piece, action.piece)
        });
      }

    case _actionsTypes.GAME_PIECES_PIECE_ROTATE_SUCCESS:
      {
        return (0, _extends3.default)({}, state, {
          piece: action.piece
        });
      }

    case _actionsTypes.GAME_PIECES_PIECE_MOVE_SUCCESS:
      {
        return (0, _extends3.default)({}, state, {
          piece: action.piece
        });
      }

    case _actionsTypes.GAME_PIECES_CLAIM_PIECE_SUCCESS:
      {
        return (0, _extends3.default)({}, state, {
          next: state.next ? state.next.concat(action.pieces) : action.pieces
        });
      }

    case _actionsTypes.GAME_BONUS_ADD:
      {
        return (0, _extends3.default)({}, state, {
          next: state.next ? [action.bonus].concat((0, _toConsumableArray3.default)(state.next)) : [action.bonus]
        });
      }

    case _actionsTypes.GAME_MALUS_ADD_SUCCESS:
      {
        return (0, _extends3.default)({}, state, {
          next: state.next ? [action.malus].concat((0, _toConsumableArray3.default)(state.next)) : [action.malus]
        });
      }

    case _actionsTypes.GAME_LOSE:
      {
        return (0, _extends3.default)({}, state, {
          piece: null
        });
      }

    case _actionsTypes.PARTY_LEFT:
      return initialState;

    case _actionsTypes.PARTY_START:
      return {
        piece: null,
        next: []
      };

    default:
      return state;
  }
};

exports.default = pieces;