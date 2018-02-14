"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToPlayerFormProps = exports.mapStateToPlayerFormProps = exports.PlayerForm = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require("react-redux");

var _player = require("../../actions/player");

var _Common = require("../../components/helpers/Common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerForm = exports.PlayerForm = function PlayerForm(_ref) {
  var player = _ref.player,
      changeNickname = _ref.changeNickname,
      saveNickname = _ref.saveNickname;

  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: "20px" },
    _react2.default.createElement(
      _Common.Paragraph,
      { center: true, size: "20px", padding: "20px", gameFont: true, color: "accent" },
      "Enter your player nickname"
    ),
    _react2.default.createElement(
      _Common.FlexContainer,
      { flex: true },
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(
        "form",
        { onSubmit: function onSubmit(e) {
            return saveNickname(e, player);
          } },
        _react2.default.createElement(
          _Common.FlexContainer,
          null,
          _react2.default.createElement(_Common.Input, {
            id: "nicknameInput",
            placeholder: "Nickname...",
            name: "nickname",
            value: player.nickname,
            onChange: function onChange(e) {
              return changeNickname(e, player);
            }
          }),
          _react2.default.createElement(
            _Common.Button,
            {
              id: "submitButton",
              type: "submit",
              primary: true,
              style: { marginLeft: "20px" }
            },
            "SAVE"
          )
        )
      ),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

var mapStateToPlayerFormProps = exports.mapStateToPlayerFormProps = function mapStateToPlayerFormProps(_ref2) {
  var player = _ref2.player;
  return {
    player: player
  };
};

var mapDispatchToPlayerFormProps = exports.mapDispatchToPlayerFormProps = function mapDispatchToPlayerFormProps(dispatch) {
  return {
    changeNickname: function changeNickname(event, player) {
      dispatch((0, _player.updatePlayer)((0, _extends3.default)({}, player, {
        nickname: event.target.value
      })));
    },
    saveNickname: function saveNickname(event, player) {
      event.preventDefault();
      dispatch((0, _player.savePlayer)(player));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToPlayerFormProps, mapDispatchToPlayerFormProps)(PlayerForm);