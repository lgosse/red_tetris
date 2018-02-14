"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TilePreview = undefined;

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n  color: ", ";\n  font-size: ", ";\n"], ["\n  color: ", ";\n  font-size: ", ";\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _Common = require("../helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParagraphContainer = _styledComponents2.default.span(_templateObject, _global2.default.color.primary, _global2.default.font.size.subtitle);

var TilePreview = exports.TilePreview = function TilePreview(props) {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { flex: true },
    _react2.default.createElement(
      _Common.Paragraph,
      { center: true },
      _react2.default.createElement(_Common.Icon, { className: props.icon, size: "50px", primary: true })
    ),
    _react2.default.createElement(
      _Common.Paragraph,
      { center: true, width: "70%" },
      _react2.default.createElement(
        ParagraphContainer,
        null,
        props.children
      )
    )
  );
};

var RedTetrisPreview = function RedTetrisPreview() {
  return _react2.default.createElement(
    _Common.LightContainer,
    null,
    _react2.default.createElement(
      _Common.FullSizeContainer,
      { padding: "40px", flexContainer: true },
      _react2.default.createElement(
        TilePreview,
        { icon: "users" },
        _react2.default.createElement(
          "p",
          null,
          _react2.default.createElement(
            _Common.GameFont,
            null,
            "Multiplayer"
          )
        ),
        _react2.default.createElement(
          "p",
          null,
          "Did you ever dream of playing ",
          _react2.default.createElement(
            _Common.GameFont,
            null,
            "TETRIS"
          ),
          " with your friends without the fear of boring them? We made your dream come true."
        )
      ),
      _react2.default.createElement(
        TilePreview,
        { icon: "gamepad" },
        _react2.default.createElement(
          "p",
          null,
          _react2.default.createElement(
            _Common.GameFont,
            null,
            "TETRIS, but better"
          )
        ),
        _react2.default.createElement(
          "p",
          null,
          "Beautiful, powerful, extendable, and yet still your beloved simple game."
        )
      ),
      _react2.default.createElement(
        TilePreview,
        { icon: "university" },
        _react2.default.createElement(
          "p",
          null,
          _react2.default.createElement(
            _Common.GameFont,
            null,
            "Competitive"
          )
        ),
        _react2.default.createElement(
          "p",
          null,
          "Ever thought of being the first ",
          _react2.default.createElement(
            _Common.GameFont,
            null,
            "TETRIS"
          ),
          " pro player in the world? It's time to unleash your OCD and become the very best."
        )
      )
    ),
    _react2.default.createElement(
      _Common.FullSizeContainer,
      null,
      _react2.default.createElement(_Common.HexaSeparator, { primary: true })
    )
  );
};

exports.default = RedTetrisPreview;