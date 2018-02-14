"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  width: 100%;\n  background-color: ", ";\n  background-image: ", ";\n  min-height: calc(100vh - 111px);\n"], ["\n  width: 100%;\n  background-color: ", ";\n  background-image: ", ";\n  min-height: calc(100vh - 111px);\n"]);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Body = _styledComponents2.default.div(_templateObject, _global2.default.color.primary, _global2.default.assets.backgroundRed);

exports.default = Body;