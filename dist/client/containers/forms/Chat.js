'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  padding: 4px;\n  min-height: 36px;\n  height: 36px;\n'], ['\n  display: flex;\n  padding: 4px;\n  min-height: 36px;\n  height: 36px;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  flex: 1;\n  border-top-left-radius: ', ';\n  border-bottom-left-radius: ', ';\n  outline: none;\n  border: none;\n  padding: 5px;\n  font-family: ', ';\n'], ['\n  flex: 1;\n  border-top-left-radius: ', ';\n  border-bottom-left-radius: ', ';\n  outline: none;\n  border: none;\n  padding: 5px;\n  font-family: ', ';\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  font-family: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-right-radius: ', ';\n  color: ', ';\n  border: none;\n  outline: none;\n'], ['\n  font-family: ', ';\n  border-top-right-radius: ', ';\n  border-bottom-right-radius: ', ';\n  color: ', ';\n  border: none;\n  outline: none;\n']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n  width: 100%;\n  flex: 1;\n  overflow: scroll;\n  padding: 12px;\n'], ['\n  width: 100%;\n  flex: 1;\n  overflow: scroll;\n  padding: 12px;\n']),
    _templateObject5 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  max-width: 100%;\n  border-radius: ', ';\n  margin-left: ', ';\n  padding: ', ';\n  box-shadow: ', ';\n  color: ', ';\n'], ['\n  background-color: ', ';\n  max-width: 100%;\n  border-radius: ', ';\n  margin-left: ', ';\n  padding: ', ';\n  box-shadow: ', ';\n  color: ', ';\n']),
    _templateObject6 = (0, _taggedTemplateLiteral3.default)(['\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  ', ';\n'], ['\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  ', ';\n']),
    _templateObject7 = (0, _taggedTemplateLiteral3.default)(['\n  background-color: ', ';\n  max-width: 100%;\n  border-radius: ', ';\n  margin-right: ', ';\n  padding: ', ';\n  box-shadow: ', ';\n  color: ', ';\n'], ['\n  background-color: ', ';\n  max-width: 100%;\n  border-radius: ', ';\n  margin-right: ', ';\n  padding: ', ';\n  box-shadow: ', ';\n  color: ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Common = require('../../components/helpers/Common');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _party = require('../../actions/party');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputContainer = _styledComponents2.default.form(_templateObject);

var Input = _styledComponents2.default.input(_templateObject2, _global2.default.border.radius, _global2.default.border.radius, _global2.default.font.family.primary);

var SendButton = _styledComponents2.default.button(_templateObject3, _global2.default.font.family.game, _global2.default.border.radius, _global2.default.border.radius, _global2.default.color.primary);

var MessagesContainer = _styledComponents2.default.div(_templateObject4);

var OwnerMessage = _styledComponents2.default.div(_templateObject5, _global2.default.color.accent, _global2.default.border.radius, _global2.default.padding.md, _global2.default.padding.sm, _global2.default.shadow.light, _global2.default.color.primary);

var SenderName = _styledComponents2.default.div(_templateObject6, function (props) {
  return props.right && 'text-align: right';
});

var OtherMessage = _styledComponents2.default.div(_templateObject7, _global2.default.color.accent, _global2.default.border.radius, _global2.default.padding.md, _global2.default.padding.sm, _global2.default.shadow.light, _global2.default.color.primary);

var Messages = function Messages(_ref) {
  var messages = _ref.messages,
      player = _ref.player;
  return _react2.default.createElement(
    MessagesContainer,
    {
      id: 'messages-container',
      ref: function ref() {
        return document.getElementById('messages-container') && (document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight);
      }
    },
    messages.map(function (message, index) {
      return message.senderId === player.socketId ? _react2.default.createElement(
        _Common.FlexContainer,
        { key: index },
        _react2.default.createElement(_Common.FlexSpacer, null),
        _react2.default.createElement(
          'div',
          { style: { marginTop: '10px' } },
          _react2.default.createElement(
            SenderName,
            { right: true },
            'me'
          ),
          _react2.default.createElement(
            OwnerMessage,
            null,
            message.text
          )
        )
      ) : _react2.default.createElement(
        _Common.FlexContainer,
        { key: index },
        _react2.default.createElement(
          'div',
          { style: { marginTop: '10px' } },
          _react2.default.createElement(
            SenderName,
            null,
            message.senderName
          ),
          _react2.default.createElement(
            OtherMessage,
            null,
            message.text
          )
        ),
        _react2.default.createElement(_Common.FlexSpacer, null)
      );
    })
  );
};

_react2.default.createElement(
  'a',
  { href: 'http://localhost:8081/forgotten-password/{uniquegeneratedtoken}' },
  'MON LIEN'
);

var Chat = function Chat(_ref2) {
  var messages = _ref2.messages,
      player = _ref2.player,
      handleSubmit = _ref2.handleSubmit;
  return _react2.default.createElement(
    _Common.FlexContainer,
    {
      style: {
        margin: _global2.default.padding.sm,
        flex: 1
      },
      direction: 'column'
    },
    messages ? _react2.default.createElement(Messages, { messages: messages, player: player }) : _react2.default.createElement('div', { style: { flex: 1 } }),
    _react2.default.createElement(
      InputContainer,
      { onSubmit: handleSubmit },
      _react2.default.createElement(Input, { placeholder: 'Send message', name: 'message', id: 'message' }),
      _react2.default.createElement(
        SendButton,
        null,
        'SEND'
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(_ref3) {
  var messages = _ref3.party.messages,
      player = _ref3.player;
  return {
    messages: messages,
    player: player
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, getState) {
  return {
    handleSubmit: function handleSubmit(event) {
      event.preventDefault();
      var message = document.getElementById('message').value.trim();
      if (message.length > 0) {
        dispatch((0, _party.sendMessage)(message));
        document.getElementById('message').value = '';
      }
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Chat);