"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockLines = exports.blockLinesServer = exports.endParty = exports.deleteLines = exports.notifyGridUpdate = exports.updateBoard = exports.gridLoseFocus = exports.gridHasFocus = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _actionsTypes = require("../../../actionsTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridHasFocus = exports.gridHasFocus = function gridHasFocus() {
  return {
    type: _actionsTypes.GAME_HAS_FOCUS
  };
};

var gridLoseFocus = exports.gridLoseFocus = function gridLoseFocus() {
  return {
    type: _actionsTypes.GAME_LOSE_FOCUS
  };
};

var updateBoard = exports.updateBoard = function updateBoard(board) {
  return {
    type: _actionsTypes.GAME_BOARD_UPDATE,
    board: board
  };
};

var notifyGridUpdate = exports.notifyGridUpdate = function notifyGridUpdate(grid, nbLinesDestroyed) {
  return {
    type: _actionsTypes.GAME_BOARD_NOTIFY_GRID_UPDATE,
    payload: {
      grid: grid,
      nbLinesDestroyed: nbLinesDestroyed
    }
  };
};

var deleteLines = exports.deleteLines = function deleteLines() {
  return {
    type: _actionsTypes.GAME_BOARD_DELETE_LINES
  };
};

var endAnimationSub = function endAnimationSub(board, grid, x, y) {
  while (x >= 0) {
    grid[grid.length - 1 - y][grid[0].length - 1 - x] = 13;
    grid[y][x] = 13;
    x--;
    y--;
  }
  return grid;
};

var endParty = exports.endParty = function endParty(board) {
  return function (dispatch, getState) {
    if (getState().party.playing === true) {
      var newGrid = [].concat((0, _toConsumableArray3.default)(board.grid));
      var newBoard = (0, _extends3.default)({}, board, { grid: newGrid });
      var x = 0;
      var y = board.grid.length - 1;
      var interval = setInterval(function () {
        if (getState().game.board.end === true) {
          clearInterval(interval);
          return;
        }
        newBoard = (0, _extends3.default)({}, newBoard, { grid: endAnimationSub(board, newGrid, x, y) });
        dispatch(updateBoard(newBoard));
        x++;
        if (x === board.grid[0].length) {
          y--;
          x--;
        }
        if (y < board.grid.length / 2) {
          clearInterval(interval);
          dispatch(updateBoard({ end: true }));
        }
      }, 100);
    }
  };
};

var blockLinesServer = exports.blockLinesServer = function blockLinesServer(nbLines, except) {
  return {
    type: _actionsTypes.GAME_BOARD_BLOCK_LINES_SERVER,
    payload: {
      nbLines: nbLines,
      except: except
    }
  };
};

var blockLines = exports.blockLines = function blockLines(_ref) {
  var nbLines = _ref.nbLines,
      except = _ref.except;
  return function (dispatch, getState) {
    var state = getState();
    var socketId = state.player.socketId;
    var grid = state.game.board.grid;
    if (except === socketId) return;

    dispatch(updateBoard({
      grid: grid.slice(nbLines).concat([].concat((0, _toConsumableArray3.default)(Array(nbLines))).map(function (_) {
        return [].concat((0, _toConsumableArray3.default)(Array(grid[0].length))).map(function (_) {
          return -1;
        });
      }))
    }));
    dispatch(notifyGridUpdate(getState().game.board.grid, 0));
  };
};