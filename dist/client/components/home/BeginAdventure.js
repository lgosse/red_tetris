"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRouterDom = require("react-router-dom");

var _Common = require("../helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeginAdventure = function BeginAdventure() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: "40px" },
    _react2.default.createElement(
      _Common.Paragraph,
      { center: true, color: "accent", gameFont: true, size: "20px", padding: "10px" },
      "Are you ready to fight for your tetriminos' lives?"
    ),
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/new-game" },
        _react2.default.createElement(
          _Common.Button,
          { primary: true },
          "PLAY NOW"
        )
      ),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

exports.default = BeginAdventure;