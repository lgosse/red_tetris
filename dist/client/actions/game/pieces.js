'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotatePiece = exports.movePiece = exports.gameAddMalusSuccess = exports.gameAddMalus = exports.gameAddBonus = exports.claimPieceSuccess = exports.claimPiece = exports.movePieceSuccess = exports.movePieceServer = exports.rotatePieceSuccess = exports.rotatePieceServer = exports.updateCurrentPiece = exports.updatePiecesGame = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require('../../../actionsTypes');

var _utils = require('../../reducers/game/utils');

var _mods = require('./mods');

var _board = require('./board');

var _game = require('./game');

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updatePiecesGame = exports.updatePiecesGame = function updatePiecesGame(pieces) {
  return {
    type: _actionsTypes.GAME_PIECES_UPDATE,
    pieces: pieces
  };
};

var updateCurrentPiece = exports.updateCurrentPiece = function updateCurrentPiece(piece) {
  return {
    type: _actionsTypes.GAME_PIECE_UPDATE,
    piece: piece
  };
};

var rotatePieceServer = exports.rotatePieceServer = function rotatePieceServer(piece) {
  return {
    type: GAME_PIECES_PIECE_ROTATE_SERVER,
    piece: piece
  };
};

var rotatePieceSuccess = exports.rotatePieceSuccess = function rotatePieceSuccess(piece) {
  return {
    type: _actionsTypes.GAME_PIECES_PIECE_ROTATE_SUCCESS,
    piece: piece
  };
};

var movePieceServer = exports.movePieceServer = function movePieceServer(direction) {
  return {
    type: _actionsTypes.GAME_PIECES_PIECE_MOVE_SERVER,
    direction: direction
  };
};

var movePieceSuccess = exports.movePieceSuccess = function movePieceSuccess(piece) {
  return {
    type: _actionsTypes.GAME_PIECES_PIECE_MOVE_SUCCESS,
    piece: piece
  };
};

var claimPiece = exports.claimPiece = function claimPiece() {
  return {
    type: _actionsTypes.GAME_PIECES_CLAIM_PIECE
  };
};

var claimPieceSuccess = exports.claimPieceSuccess = function claimPieceSuccess(pieces) {
  return {
    type: _actionsTypes.GAME_PIECES_CLAIM_PIECE_SUCCESS,
    pieces: pieces
  };
};

var gameAddBonus = exports.gameAddBonus = function gameAddBonus(bonus) {
  return {
    type: _actionsTypes.GAME_BONUS_ADD,
    bonus: bonus
  };
};

var gameAddMalus = exports.gameAddMalus = function gameAddMalus(emitterSocketId, malus) {
  return {
    type: _actionsTypes.GAME_MALUS_ADD,
    payload: {
      emitterSocketId: emitterSocketId,
      malus: malus
    }
  };
};

var gameAddMalusSuccess = exports.gameAddMalusSuccess = function gameAddMalusSuccess(malus) {
  return {
    type: _actionsTypes.GAME_MALUS_ADD_SUCCESS,
    malus: malus
  };
};

// Thunk action creators

var movePiece = exports.movePiece = function movePiece(direction) {
  return function (dispatch, getState) {
    var _getState = getState(),
        _getState$game = _getState.game,
        board = _getState$game.board,
        pieces = _getState$game.pieces,
        party = _getState.party;

    if (!pieces.piece) return;

    if (direction === 20) {
      var down = pieces.piece.y;
      while (!(0, _utils.testCollision)((0, _extends3.default)({}, pieces.piece, { y: down + 1 }), board.grid).collide) {
        down++;
      }direction = 0;
      pieces.piece = (0, _extends3.default)({}, pieces.piece, { y: down });
    }
    var pos = {
      x: pieces.piece.x + direction,
      y: direction === 0 ? pieces.piece.y + 1 : pieces.piece.y
    };

    if (!(0, _utils.testCollision)((0, _extends3.default)({}, pieces.piece, pos), board.grid).collide) {
      dispatch(movePieceSuccess((0, _extends3.default)({}, pieces.piece, pos)));
    } else if (direction === 0) {
      var newGrid = (0, _utils.gridFusion)(pieces.piece, board.grid);
      var lines = newGrid ? (0, _utils.checkLines)(newGrid) : null;

      if (newGrid) {
        var mod = void 0;
        if ((mod = (0, _utils.isMod)(pieces.piece)) !== null) dispatch((0, _mods.setMod)(mod));
        dispatch((0, _board.updateBoard)({
          grid: newGrid,
          lines: lines
        }));
        dispatch(updatePiecesGame((0, _extends3.default)({}, pieces, {
          piece: pieces.next[0],
          next: pieces.next.slice(1)
        })));
        dispatch(claimPiece());
        (0, _timers.setTimeout)(function () {
          dispatch((0, _board.deleteLines)());
          if (mod && mod.type === 'bomb') {
            var newGrid2 = (0, _utils.deleteBomb)(mod, newGrid);
            dispatch((0, _board.updateBoard)({
              grid: newGrid2,
              lines: lines
            }));
            dispatch((0, _mods.setMod)(null));
          }
          dispatch((0, _board.notifyGridUpdate)(getState().game.board.grid, lines ? lines.length : 0));
        }, 600);
      } else if (board.end !== true) {
        dispatch((0, _game.gameLose)());
      }
    }
  };
};

var rotatePiece = exports.rotatePiece = function rotatePiece(direction) {
  return function (dispatch, getState) {
    var _getState2 = getState(),
        _getState2$game = _getState2.game,
        grid = _getState2$game.board.grid,
        piece = _getState2$game.pieces.piece;

    if (!piece) return;
    var newGrid = (0, _utils.gridZero)(piece.grid.length);

    piece.grid.forEach(function (line, y) {
      line.forEach(function (col, x) {
        newGrid[y + (piece.grid.length - 1) * ((1 - direction) / 2) + direction * x - y][x + (piece.grid.length - 1) * ((direction + 1) / 2) - x - y * direction] = col;
      });
    });

    var pos = (0, _utils.findPlace)((0, _extends3.default)({}, piece, { grid: newGrid }), grid, 0);
    if (pos !== null) {
      dispatch(rotatePieceSuccess((0, _extends3.default)({}, piece, {
        grid: newGrid
      }, pos)));
    }
  };
};