"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _board = require("./board");

var _board2 = _interopRequireDefault(_board);

var _pieces = require("./pieces");

var _pieces2 = _interopRequireDefault(_pieces);

var _score = require("./score");

var _score2 = _interopRequireDefault(_score);

var _mods = require("./mods");

var _mods2 = _interopRequireDefault(_mods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  board: _board2.default,
  pieces: _pieces2.default,
  score: _score2.default,
  mods: _mods2.default
});