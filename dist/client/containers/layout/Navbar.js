"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToNavbarProps = exports.Navbar = exports.NavLink = exports.Title = exports.Bar = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  width: 100%;\n  display: flex;\n  padding: ", ";\n  background-color: ", ";\n  color: ", ";\n  font-weight: ", ";\n  border-bottom: 1px solid #bb3c2f;\n  background-image: ", ";\n"], ["\n  width: 100%;\n  display: flex;\n  padding: ", ";\n  background-color: ", ";\n  color: ", ";\n  font-weight: ", ";\n  border-bottom: 1px solid #bb3c2f;\n  background-image: ", ";\n"]),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(["\n  font-size: ", ";\n  font-family: ", ";\n  text-shadow: ", ";\n  background-color: unset;\n"], ["\n  font-size: ", ";\n  font-family: ", ";\n  text-shadow: ", ";\n  background-color: unset;\n"]),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(["\n  color: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  text-shadow: ", ";\n  transition: all 0.5s;\n  background-color: unset;\n  border: none;\n  outline: none;\n  cursor: pointer;\n\n  &:hover {\n    text-shadow: ", ";\n  }\n"], ["\n  color: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  text-shadow: ", ";\n  transition: all 0.5s;\n  background-color: unset;\n  border: none;\n  outline: none;\n  cursor: pointer;\n\n  &:hover {\n    text-shadow: ", ";\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Common = require("../../components/helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = _styledComponents2.default.div(_templateObject, _global2.default.padding.md, _global2.default.color.primary, _global2.default.color.accent, _global2.default.font.weight.bold, _global2.default.assets.backgroundRed);

var Title = _styledComponents2.default.span(_templateObject2, _global2.default.font.size.title, _global2.default.font.family.game, _global2.default.font.shadow.heavy);

var NavLink = _styledComponents2.default.button(_templateObject3, _global2.default.color.accent, _global2.default.font.size.subtitle, _global2.default.font.family.game, _global2.default.font.shadow.light, _global2.default.font.shadow.heavy);

var Navbar = function Navbar() {
  return _react2.default.createElement(
    Bar,
    null,
    _react2.default.createElement(
      Title,
      null,
      "RED TETRIS"
    ),
    _react2.default.createElement(_Common.Spacer, null),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/", id: "home-link" },
      _react2.default.createElement(
        NavLink,
        null,
        _react2.default.createElement("i", { className: "fa fa-home" }),
        " HOME"
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "ranking", id: "ranking-link" },
      _react2.default.createElement(
        NavLink,
        null,
        _react2.default.createElement("i", { className: "fa fa-trophy" }),
        " RANKING"
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "new-game", id: "new-game-link" },
      _react2.default.createElement(
        NavLink,
        null,
        _react2.default.createElement("i", { className: "fa fa-plus" }),
        " NEW GAME"
      )
    )
  );
};

var mapStateToNavbarProps = function mapStateToNavbarProps(state) {
  return {};
};

// Testing purposes exports
exports.Bar = Bar;
exports.Title = Title;
exports.NavLink = NavLink;
exports.Navbar = Navbar;
exports.mapStateToNavbarProps = mapStateToNavbarProps;
exports.default = (0, _reactRedux.connect)(mapStateToNavbarProps, null)(Navbar);