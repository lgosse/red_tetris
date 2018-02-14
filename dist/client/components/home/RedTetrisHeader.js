"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = exports.Line = exports.EmptyBlock = exports.Block = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  -webkit-transition: all 1s ease-in-out;\n  -moz-transition: all 1s ease-in-out;\n  transition: all 1s ease-in-out;\n  background-color: ", ";\n  color: ", ";\n  font-size: 5em;\n  text-align: center;\n  font-family: ", ";\n  width: ", "px;\n  height: ", "px;\n  margin: 2px;\n  border-radius: 5px;\n  ", ";\n"], ["\n  -webkit-transition: all 1s ease-in-out;\n  -moz-transition: all 1s ease-in-out;\n  transition: all 1s ease-in-out;\n  background-color: ", ";\n  color: ", ";\n  font-size: 5em;\n  text-align: center;\n  font-family: ", ";\n  width: ", "px;\n  height: ", "px;\n  margin: 2px;\n  border-radius: 5px;\n  ", ";\n"]),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(["\n  width: ", "px;\n  height: ", "px;\n  background-color: unset;\n  ", ";\n"], ["\n  width: ", "px;\n  height: ", "px;\n  background-color: unset;\n  ", ";\n"]),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(["\n  width: 100%;\n  display: flex;\n"], ["\n  width: 100%;\n  display: flex;\n"]),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(["\n  width: ", ";\n  ", ";\n"], ["\n  width: ", ";\n  ", ";\n"]),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(["\n  font-family: ", ";\n  font-size: ", ";\n  color: ", ";\n  max-width: 70%;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top: 20px;\n  text-align: center;\n"], ["\n  font-family: ", ";\n  font-size: ", ";\n  color: ", ";\n  max-width: 70%;\n  margin-right: auto;\n  margin-left: auto;\n  margin-top: 20px;\n  text-align: center;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _Common = require("../helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockLength = 100;

var bounceAnimation = "\n  @keyframes bounce {\n    0%,\n    100% {\n      margin: 2px;\n      width: " + (blockLength - 4) + "px;\n      height: " + (blockLength - 4) + "px;\n    }\n\n    50% {\n      margin: 5px;\n      width: " + (blockLength - 10) + "px;\n      height: " + (blockLength - 10) + "px;\n    }\n  }\n\n  animation-name: bounce;\n  animation-iteration-count: infinite;\n  animation-duration: 1s;\n  animation-timing-function: ease-in-out;\n  animation-fill-mode: both;\n";

var Block = exports.Block = _styledComponents2.default.div(_templateObject, function (props) {
  return props.backgroundColor ? _global2.default.color[props.backgroundColor] : _global2.default.color.accent;
}, function (props) {
  return props.color ? _global2.default.color[props.color] : _global2.default.color.primary;
}, _global2.default.font.family.game, blockLength - 4, blockLength - 4, bounceAnimation);

var EmptyBlock = exports.EmptyBlock = _styledComponents2.default.div(_templateObject2, blockLength, blockLength, bounceAnimation);

var Line = exports.Line = _styledComponents2.default.div(_templateObject3);

var Container = exports.Container = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.width ? props.width : blockLength * 3 + "px";
}, function (props) {
  return props.height && "height: " + props.height;
});

var Description = _styledComponents2.default.div(_templateObject5, _global2.default.font.family.game, _global2.default.font.size.title, _global2.default.color.accent);

var RedTetrisHeader = function RedTetrisHeader() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: "40px" },
    _react2.default.createElement(
      _Common.FullSizeContainer,
      null,
      _react2.default.createElement(
        _Common.FlexContainer,
        null,
        _react2.default.createElement(_Common.FlexSpacer, null),
        _react2.default.createElement(
          Container,
          null,
          _react2.default.createElement(
            Line,
            null,
            _react2.default.createElement(
              Block,
              null,
              "R"
            ),
            _react2.default.createElement(
              Block,
              null,
              "E"
            ),
            _react2.default.createElement(
              Block,
              null,
              "D"
            )
          ),
          _react2.default.createElement(
            Line,
            null,
            _react2.default.createElement(EmptyBlock, null),
            _react2.default.createElement(Block, null),
            _react2.default.createElement(EmptyBlock, null)
          )
        ),
        _react2.default.createElement(_Common.FlexSpacer, null)
      )
    ),
    _react2.default.createElement(
      _Common.FullSizeContainer,
      null,
      _react2.default.createElement(
        Description,
        null,
        "Enter the futuristic era of retro-gaming"
      )
    )
  );
};

exports.default = RedTetrisHeader;