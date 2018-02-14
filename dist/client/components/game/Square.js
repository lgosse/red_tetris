"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _global = require("../../styles/global");

var _global2 = _interopRequireDefault(_global);

var _gameStyle = require("../../styles/gameStyle");

var _gameStyle2 = _interopRequireDefault(_gameStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Square = function Square(_ref) {
  var color = _ref.color;

  if (color === 10) {
    return _react2.default.createElement(
      "div",
      {
        style: {
          width: "4vh",
          height: "4vh",
          zIndex: "2"
        }
      },
      _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            animation: _gameStyle2.default.animations.bomb + " 0.2s infinite",
            animationDirection: "alternate"
          }
        },
        _react2.default.createElement("div", { style: _gameStyle2.default.bomb.all }),
        _react2.default.createElement("div", { style: _gameStyle2.default.bomb.mech }),
        _react2.default.createElement("div", { style: _gameStyle2.default.bomb.reflect }),
        _react2.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              transform: "rotate(-10deg)",
              animation: _gameStyle2.default.animations.fire + " 0.1s infinite",
              animationDirection: "alternate"
            }
          },
          _react2.default.createElement("div", { style: _gameStyle2.default.bomb.fire }),
          _react2.default.createElement("div", { style: _gameStyle2.default.bomb.fire2 }),
          _react2.default.createElement("div", { style: _gameStyle2.default.bomb.fire3 })
        )
      )
    );
  } else if (color === 11) {
    return _react2.default.createElement(
      "div",
      {
        style: {
          width: "4vh",
          height: "4vh",
          zIndex: "2",
          position: "relative"
        }
      },
      _react2.default.createElement(
        "div",
        { style: _gameStyle2.default.tnt.base },
        _react2.default.createElement("div", { style: _gameStyle2.default.tnt.bip })
      ),
      _react2.default.createElement("div", { style: _gameStyle2.default.tnt.bandes[1] }),
      _react2.default.createElement("div", { style: _gameStyle2.default.tnt.bandes[2] })
    );
  } else {
    return _react2.default.createElement(
      "div",
      { style: _gameStyle2.default.square(color) },
      _react2.default.createElement("div", { style: _gameStyle2.default.squareIn(color) })
    );
  }
};

exports.default = Square;