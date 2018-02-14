"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _RedTetrisHeader = require("../../components/home/RedTetrisHeader");

var _RedTetrisHeader2 = _interopRequireDefault(_RedTetrisHeader);

var _RedTetrisPreview = require("../../components/home/RedTetrisPreview");

var _RedTetrisPreview2 = _interopRequireDefault(_RedTetrisPreview);

var _BeginAdventure = require("../../components/home/BeginAdventure");

var _BeginAdventure2 = _interopRequireDefault(_BeginAdventure);

var _Common = require("../../components/helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    _react2.default.createElement(_RedTetrisHeader2.default, null),
    _react2.default.createElement(_Common.HexaSeparator, null),
    _react2.default.createElement(_RedTetrisPreview2.default, null),
    _react2.default.createElement(_BeginAdventure2.default, null)
  );
};

exports.default = Home;