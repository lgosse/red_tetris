"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.Code404 = exports.containerStyle = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  color: ", ";\n  font-family: ", ";\n  font-size: 40px;\n  text-align: center;\n  width: 100%;\n"], ["\n  color: ", ";\n  font-family: ", ";\n  font-size: 40px;\n  text-align: center;\n  width: 100%;\n"]),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(["\n  text-align: center;\n  font-size: ", ";\n  color: ", ";\n  width: 300px;\n  margin: auto;\n"], ["\n  text-align: center;\n  font-size: ", ";\n  color: ", ";\n  width: 300px;\n  margin: auto;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code404 = _styledComponents2.default.div(_templateObject, _global2.default.color.accent, _global2.default.font.family.game);

var Message = _styledComponents2.default.div(_templateObject2, _global2.default.font.size.subtitle, _global2.default.color.accent);

var containerStyle = {
  width: "100%"
};

var NotFound = function NotFound() {
  return _react2.default.createElement(
    "div",
    { style: containerStyle },
    _react2.default.createElement(
      Code404,
      null,
      "404"
    ),
    _react2.default.createElement(
      Message,
      null,
      "We're sorry but your requested page is unknown to us :("
    )
  );
};

exports.containerStyle = containerStyle;
exports.Code404 = Code404;
exports.Message = Message;
exports.default = NotFound;