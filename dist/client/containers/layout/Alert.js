"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  max-width: 300px;\n  width: 100%;\n  opacity: 0;\n  padding: 20px;\n  background-color: #333333;\n  color: white;\n  border-radius: 5px;\n  transition: all 0.3s;\n\n  &.show {\n    opacity: 1;\n  }\n"], ["\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  max-width: 300px;\n  width: 100%;\n  opacity: 0;\n  padding: 20px;\n  background-color: #333333;\n  color: white;\n  border-radius: 5px;\n  transition: all 0.3s;\n\n  &.show {\n    opacity: 1;\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertDisplay = _styledComponents2.default.div(_templateObject);

var Alert = exports.Alert = function Alert(_ref) {
  var alert = _ref.alert;
  return alert.message ? _react2.default.createElement(
    AlertDisplay,
    { className: "show" },
    alert.message
  ) : _react2.default.createElement(AlertDisplay, null);
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var alert = _ref2.alert;
  return { alert: alert };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Alert);