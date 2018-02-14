'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = exports.HexaSeparator = exports.Input = exports.GameFont = exports.LightContainer = exports.RedContainer = exports.Paragraph = exports.FullSizeContainer = exports.FlexSpacer = exports.FlexContainer = exports.Button = exports.Spacer = undefined;

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  flex: 1;\n'], ['\n  flex: 1;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  padding: 15px 25px;\n  font-family: ', ';\n  transition: all 0.5s;\n  border: none;\n  background-color: unset;\n  outline: none;\n  cursor: pointer;\n\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n'], ['\n  padding: 15px 25px;\n  font-family: ', ';\n  transition: all 0.5s;\n  border: none;\n  background-color: unset;\n  outline: none;\n  cursor: pointer;\n\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n'], ['\n  display: flex;\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n'], ['\n  width: 100%;\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  display: block;\n  position: relative;\n  width: 20px;\n  height: 11.54700538px;\n  background-color: ', ';\n\n  margin: 6.66666667px 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n\n  &:before,\n  &:after {\n    content: \'\';\n    position: absolute;\n    width: 0;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n  }\n\n  &:before {\n    bottom: 100%;\n    border-bottom: 6.66666667px solid\n      ', ';\n  }\n\n  &:after {\n    top: 100%;\n    width: 0;\n    border-top: 6.66666667px solid\n      ', ';\n  }\n'], ['\n  display: block;\n  position: relative;\n  width: 20px;\n  height: 11.54700538px;\n  background-color: ', ';\n\n  margin: 6.66666667px 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n\n  &:before,\n  &:after {\n    content: \'\';\n    position: absolute;\n    width: 0;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n  }\n\n  &:before {\n    bottom: 100%;\n    border-bottom: 6.66666667px solid\n      ', ';\n  }\n\n  &:after {\n    top: 100%;\n    width: 0;\n    border-top: 6.66666667px solid\n      ', ';\n  }\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  height: 6px;\n'], ['\n  height: 6px;\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n  ', ';\n  ', ';\n  ', ';\n  font-size: ', ';\n  ', ';\n  ', ';\n'], ['\n  ', ';\n  ', ';\n  ', ';\n  font-size: ', ';\n  ', ';\n  ', ';\n']),
    _templateObject8 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  background-image: ', ';\n'], ['\n  background-color: ', ';\n  background-image: ', ';\n']),
    _templateObject9 = (0, _taggedTemplateLiteral3.default)(['\n  background-image: ', ';\n  background-color: ', ';\n'], ['\n  background-image: ', ';\n  background-color: ', ';\n']),
    _templateObject10 = (0, _taggedTemplateLiteral3.default)(['\n  font-family: ', ';\n'], ['\n  font-family: ', ';\n']),
    _templateObject11 = (0, _taggedTemplateLiteral3.default)(['\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  outline: none;\n  display: block;\n  width: 234px;\n  padding: 7px;\n  border: none;\n  border-bottom: 1px solid #ddd;\n  background: transparent;\n  margin-bottom: 10px;\n  font: 16px Arial, Helvetica, sans-serif;\n  height: 45px;\n  color: ', ';\n\n  &::placeholder {\n    color: ', ';\n  }\n'], ['\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  outline: none;\n  display: block;\n  width: 234px;\n  padding: 7px;\n  border: none;\n  border-bottom: 1px solid #ddd;\n  background: transparent;\n  margin-bottom: 10px;\n  font: 16px Arial, Helvetica, sans-serif;\n  height: 45px;\n  color: ', ';\n\n  &::placeholder {\n    color: ', ';\n  }\n']),
    _templateObject12 = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n'], ['\n  ', '\n  ', '\n  ', '\n  ', '\n  ', '\n  ', ';\n  ', ';\n  ', ';\n  ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spacer = exports.Spacer = _styledComponents2.default.div(_templateObject);

var Button = exports.Button = _styledComponents2.default.button(_templateObject2, _global2.default.font.family.game, function (props) {
  return props.disabled && '\n      opacity: 0.5;\n      cursor: default;\n      pointer-events: none;\n    ';
}, function (props) {
  return props.width !== undefined && 'width: ' + props.width;
}, function (props) {
  return props.margin !== undefined && 'margin: ' + props.margin;
}, function (props) {
  return props.marginTop !== undefined && 'margin-top: ' + props.marginTop;
}, function (props) {
  return props.marginBottom !== undefined && 'margin-bottom: ' + props.marginBottom;
}, function (props) {
  return props.marginLeft !== undefined && 'margin-left: ' + props.marginLeft;
}, function (props) {
  return props.marginRight !== undefined && 'margin-right: ' + props.marginRight;
}, function (props) {
  return props.primary ? '\n          background-color: ' + _global2.default.color.primary + ';\n          border: 1px solid ' + _global2.default.color.accent + ';\n          color: ' + _global2.default.color.accent + ';\n\n          &:hover {\n            background-color: ' + _global2.default.color.accent + ';\n            color: ' + _global2.default.color.primary + ';\n          }\n        ' : '\n          background-color: ' + _global2.default.color.accent + ';\n          color: ' + _global2.default.color.primary + ';\n\n          &:hover {\n            background-color: ' + _global2.default.color.accent + ';\n            color: ' + _global2.default.color.accent + ';\n          }\n    ';
});

var FlexContainer = exports.FlexContainer = _styledComponents2.default.div(_templateObject3, function (props) {
  return props.direction && 'flex-direction: ' + props.direction;
}, function (props) {
  return props.height && 'height: ' + props.height;
}, function (props) {
  return props.flex && 'flex: 1';
}, function (props) {
  return props.padding && 'padding: ' + props.padding;
}, function (props) {
  return props.paddingRight && 'padding-right: ' + props.paddingRight;
}, function (props) {
  return props.paddingLeft && 'padding-left: ' + props.paddingLeft;
}, function (props) {
  return props.paddingTop && 'padding-top: ' + props.paddingTop;
}, function (props) {
  return props.paddingBottom && 'padding-bottom: ' + props.paddingBottom;
}, function (props) {
  return props.padding && 'padding: ' + props.padding;
});

var FlexSpacer = exports.FlexSpacer = _styledComponents2.default.div(_templateObject);

var FullSizeContainer = exports.FullSizeContainer = _styledComponents2.default.div(_templateObject4, function (props) {
  return props.height && 'height: ' + props.height;
}, function (props) {
  return props.padding && 'padding: ' + props.padding;
}, function (props) {
  return props.flexContainer && 'display: flex';
}, function (props) {
  return props.flex && 'flex: 1';
});

var Hexagone = _styledComponents2.default.span(_templateObject5, function (props) {
  return props.primary ? '#bb3c2f' : '#dcddd8';
}, function (props) {
  return props.primary ? '#bb3c2f' : '#dcddd8';
}, function (props) {
  return props.primary ? '#bb3c2f' : '#dcddd8';
});

var HexaContainer = _styledComponents2.default.div(_templateObject6);

var Paragraph = exports.Paragraph = _styledComponents2.default.div(_templateObject7, function (props) {
  if (props.width && props.center) {
    return 'margin: auto; width: ' + props.width + '; text-align: center';
  } else if (props.width && !props.center) {
    return 'width: ' + props.width;
  } else if (!props.width && props.center) {
    return 'text-align: center';
  }
}, function (props) {
  return props.color && 'color: ' + _global2.default.color[props.color];
}, function (props) {
  return props.bold && 'font-weight: 700';
}, function (props) {
  return props.size ? props.size : '14px';
}, function (props) {
  return props.padding && 'padding: ' + props.padding;
}, function (props) {
  return props.gameFont && 'font-family: ' + _global2.default.font.family.game;
});

var RedContainer = exports.RedContainer = FullSizeContainer.extend(_templateObject8, _global2.default.color.primary, _global2.default.assets.backgroundRed);

var LightContainer = exports.LightContainer = FullSizeContainer.extend(_templateObject9, _global2.default.assets.backgroundLight, _global2.default.color.accent);

var GameFont = exports.GameFont = _styledComponents2.default.span(_templateObject10, _global2.default.font.family.game);

var Input = exports.Input = _styledComponents2.default.input(_templateObject11, _global2.default.color.accent, _global2.default.color.accent);

var HexaSeparator = exports.HexaSeparator = function HexaSeparator(props) {
  return _react2.default.createElement(
    HexaContainer,
    null,
    _react2.default.createElement(Hexagone, { primary: props.primary })
  );
};

var FaIcon = function FaIcon(props) {
  return _react2.default.createElement('i', { className: 'fa fa-' + props.className });
};

var Icon = exports.Icon = (0, _styledComponents2.default)(FaIcon)(_templateObject12, function (props) {
  return props.margin && 'margin: ' + props.margin + ';';
}, function (props) {
  return props.marginLeft && 'margin-left: ' + props.marginLeft + ';';
}, function (props) {
  return props.marginRight && 'margin-right: ' + props.marginRight + ';';
}, function (props) {
  return props.marginBottom && 'margin-bottom: ' + props.marginBottom + ';';
}, function (props) {
  return props.marginTop && 'margin-top: ' + props.marginTop + ';';
}, function (props) {
  return props.primary && 'color: ' + _global2.default.color.primary + ';';
}, function (props) {
  return props.accent && 'color: ' + _global2.default.color.accent + ';';
}, function (props) {
  return props.size && 'font-size: ' + props.size + ';';
}, function (props) {
  return props.clickable && 'cursor: pointer;';
});