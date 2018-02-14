"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tetri = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _gameStyle = require("../../styles/gameStyle");

var _gameStyle2 = _interopRequireDefault(_gameStyle);

var _Square = require("./Square");

var _Square2 = _interopRequireDefault(_Square);

var _utils = require("../../reducers/game/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = function Line(_ref) {
  var line = _ref.line;
  return _react2.default.createElement(
    "div",
    { style: { display: "flex" } },
    line.map(function (square, index) {
      return square ? _react2.default.createElement(_Square2.default, { key: index, color: square }) : _react2.default.createElement("div", {
        key: index,
        style: {
          width: "4vh",
          height: "4vh"
        }
      });
    })
  );
};

var reduceColumnsEndTetri = function reduceColumnsEndTetri(tetri) {
  return !tetri.reduce(function (lineAccumulator, line) {
    return line.reduce(function (blockAccumulator, block, index) {
      return index === line.length - 1 ? !!block : true;
    }) || lineAccumulator;
  }, false) ? tetri.map(function (line) {
    return line.filter(function (block, index) {
      return index !== line.length - 1;
    });
  }) : tetri;
};

var reduceTetri = function reduceTetri(tetri) {
  return reduceColumnsEndTetri(tetri);
};

var Tetri = exports.Tetri = function Tetri(_ref2) {
  var tetri = _ref2.tetri,
      position = _ref2.position;

  return _react2.default.createElement(
    "div",
    { style: _gameStyle2.default.pieces.all(position) },
    reduceTetri(tetri).map(function (line, index) {
      return _react2.default.createElement(Line, { key: index, line: line });
    })
  );
};