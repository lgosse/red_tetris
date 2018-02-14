"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieceMalus = exports.PieceBonus = exports.Piece = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tetriminos = {
  0: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  1: [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  2: [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  3: [[4, 4], [4, 4]],
  4: [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  5: [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  6: [[7, 7, 0], [0, 7, 7], [0, 0, 0]]
};

var bonuses = {
  0: [[10]], // bomb
  1: [[11]], // dynamite
  2: [[12]] // mini block
};

var maluses = {
  0: [[-1]], // mini indestructible block
  1: [[9, 0, 9], [0, 9, 0], [9, 0, 9]] // cancer
};

var Piece = exports.Piece = function Piece() {
  (0, _classCallCheck3.default)(this, Piece);

  this.grid = tetriminos[Math.trunc(Math.random() * Object.keys(tetriminos).length)];
  this.x = 4;
  this.y = 0;
};

var PieceBonus = exports.PieceBonus = function PieceBonus() {
  (0, _classCallCheck3.default)(this, PieceBonus);

  this.grid = bonuses[Math.trunc(Math.random() * Object.keys(bonuses).length)];
  this.x = 4;
  this.y = 0;
};

var PieceMalus = exports.PieceMalus = function PieceMalus() {
  (0, _classCallCheck3.default)(this, PieceMalus);

  this.grid = maluses[Math.trunc(Math.random() * Object.keys(maluses).length)];
  this.x = 4;
  this.y = 0;
};