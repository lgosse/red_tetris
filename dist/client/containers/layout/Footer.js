"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  width: 100%;\n  display: flex;\n  padding: ", ";\n  background-color: ", ";\n  color: ", ";\n  font-weight: ", ";\n  border-top: 1px solid #bb3c2f;\n  background-image: ", ";\n"], ["\n  width: 100%;\n  display: flex;\n  padding: ", ";\n  background-color: ", ";\n  color: ", ";\n  font-weight: ", ";\n  border-top: 1px solid #bb3c2f;\n  background-image: ", ";\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _Common = require("../../components/helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = _styledComponents2.default.div(_templateObject, _global2.default.padding.md, _global2.default.color.primary, _global2.default.color.accent, _global2.default.font.weight.bold, _global2.default.assets.backgroundRed);

var Footer = function Footer() {
  return _react2.default.createElement(
    Bar,
    { padding: "20px" },
    _react2.default.createElement(_Common.FlexSpacer, null),
    _react2.default.createElement(
      _Common.Paragraph,
      { size: "16px", gameFont: true },
      "Made with ",
      _react2.default.createElement(_Common.Icon, { className: "terminal" }),
      " by lgosse and tbayet"
    )
  );
};

exports.default = Footer;