'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../actionsTypes');

var _pieces = require('../actions/game/pieces');

var _utils = require('../reducers/game/utils');

var _board = require('../actions/game/board');

var _game = require('../actions/game/game');

var gameMiddleware = function gameMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      switch (action.type) {
        case _actionsTypes.GAME_PIECES_PIECE_MOVE_SERVER:
          {
            dispatch((0, _pieces.movePiece)(action.direction));

            break;
          }

        case _actionsTypes.GAME_PIECES_PIECE_ROTATE_SERVER:
          {
            dispatch((0, _pieces.rotatePiece)(action.direction));

            break;
          }

        case _actionsTypes.GAME_BOARD_BLOCK_LINES_SERVER:
          {
            dispatch((0, _board.blockLines)(action.payload));

            break;
          }

        case _actionsTypes.GAME_MALUS_ADD:
          {
            if (getState().player.socketId !== action.payload.emitterSocketId) {
              dispatch((0, _pieces.gameAddMalusSuccess)(action.payload.malus));
            }
          }

        case _actionsTypes.GAME_MODS_SET:
          {
            var _getState = getState(),
                grid = _getState.game.board.grid;

            if (!action.mod || !action.mod.do) break;

            switch (action.mod.type) {
              case 'bomb':
                {
                  var newGrid = (0, _utils.deleteLinesF)(grid, [action.mod.y]);
                  newGrid = newGrid.map(function (line) {
                    line[action.mod.x] = 0;
                  });
                  dispatch((0, _board.updateBoard)({ grid: newGrid }));
                  break;
                }
              default:
                break;
            }

            break;
          }

        default:
          break;
      }

      return next(action);
    };
  };
};

exports.default = gameMiddleware;