'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  flex: 1;\n  margin-left: 1px;\n  margin-top: 1px;\n'], ['\n  flex: 1;\n  margin-left: 1px;\n  margin-top: 1px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  flex: 1;\n  margin-left: 1px;\n  margin-top: 1px;\n'], ['\n  background-color: ', ';\n  flex: 1;\n  margin-left: 1px;\n  margin-top: 1px;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  flex-direction: column;\n  height: 155px;\n'], ['\n  flex-direction: column;\n  height: 155px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Common = require('../helpers/Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapVoid = _styledComponents2.default.div(_templateObject);

var MapItem = _styledComponents2.default.div(_templateObject2, _global2.default.color.accent);

var Line = function Line(_ref) {
  var line = _ref.line;
  return _react2.default.createElement(
    _Common.FlexContainer,
    { flex: true },
    line.map(function (column, index) {
      return column === 0 ? _react2.default.createElement(MapVoid, { key: index }) : _react2.default.createElement(MapItem, { key: index });
    })
  );
};

var LinesContainer = _Common.FlexContainer.extend(_templateObject3);

var Map = function Map(_ref2) {
  var map = _ref2.map;
  return _react2.default.createElement(
    LinesContainer,
    null,
    map.map(function (line, index) {
      return _react2.default.createElement(Line, { line: line, key: index });
    })
  );
};

exports.default = Map;