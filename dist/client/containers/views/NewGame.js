"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  box-sizing: border-box;\n  flex: 1;\n"], ["\n  box-sizing: border-box;\n  flex: 1;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _PlayerForm = require("../forms/PlayerForm");

var _PlayerForm2 = _interopRequireDefault(_PlayerForm);

var _Common = require("../../components/helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonsContainer = _styledComponents2.default.div(_templateObject);

var NewGame = function NewGame() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_PlayerForm2.default, null)
    ),
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(
        ButtonsContainer,
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: "create-party", id: "create-party-link" },
          _react2.default.createElement(
            _Common.Button,
            { primary: true, width: "100%", marginTop: "20px" },
            "CREATE A NEW PARTY"
          )
        ),
        _react2.default.createElement(
          _Common.Paragraph,
          { gameFont: true, color: "accent", size: "20px", center: true, padding: "20px" },
          "OR"
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: "party-list", id: "party-list-link" },
          _react2.default.createElement(
            _Common.Button,
            { primary: true, width: "100%" },
            "JOIN A PARTY"
          )
        )
      ),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

exports.default = NewGame;