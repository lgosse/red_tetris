"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerName = exports.PlayerStateContainer = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  box-shadow: ", ";\n  border-radius: ", ";\n  color: ", ";\n  width: 100px;\n  height: 172px;\n  padding: 2px;\n  overflow: hidden;\n"], ["\n  box-shadow: ", ";\n  border-radius: ", ";\n  color: ", ";\n  width: 100px;\n  height: 172px;\n  padding: 2px;\n  overflow: hidden;\n"]),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(["\n  width: 100%;\n  font-family: ", ";\n  font-size: 12px;\n  text-align: center;\n"], ["\n  width: 100%;\n  font-family: ", ";\n  font-size: 12px;\n  text-align: center;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Map = require("./Map");

var _Map2 = _interopRequireDefault(_Map);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Common = require("../helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerStateContainer = exports.PlayerStateContainer = _Common.RedContainer.extend(_templateObject, _global2.default.shadow.light, _global2.default.border.radius, _global2.default.color.accent);

var PlayerName = exports.PlayerName = _styledComponents2.default.div(_templateObject2, _global2.default.font.family.game);

var PlayerState = function PlayerState(_ref) {
  var player = _ref.player;
  return _react2.default.createElement(
    PlayerStateContainer,
    null,
    _react2.default.createElement(
      PlayerName,
      null,
      " ",
      player.nickname,
      " "
    ),
    _react2.default.createElement(_Map2.default, { map: player.map })
  );
};

exports.default = PlayerState;