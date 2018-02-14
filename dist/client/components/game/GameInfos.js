"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  width: 200px;\n  background-color: rgba(1, 1, 1, 0.5);\n"], ["\n  width: 200px;\n  background-color: rgba(1, 1, 1, 0.5);\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Common = require("../helpers/Common");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GameInfosContainer = _styledComponents2.default.div(_templateObject);

var GameInfos = function GameInfos(_ref) {
  var party = _ref.party;
  return _react2.default.createElement(
    GameInfosContainer,
    null,
    party.name
  );
};

exports.default = GameInfos;