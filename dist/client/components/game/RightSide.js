'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  display: flex;\n  flex-wrap: wrap;\n'], ['\n  display: flex;\n  flex-wrap: wrap;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  font-family: ', ';\n  font-size: ', ';\n  color: ', ';\n  text-align: center;\n'], ['\n  font-family: ', ';\n  font-size: ', ';\n  color: ', ';\n  text-align: center;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  flex: 1;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  height: 80vh;\n  min-height: 80vh;\n'], ['\n  flex: 1;\n  border-top-right-radius: 10px;\n  border-bottom-right-radius: 10px;\n  height: 80vh;\n  min-height: 80vh;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _PlayerState = require('./PlayerState');

var _PlayerState2 = _interopRequireDefault(_PlayerState);

var _GameInfos = require('./GameInfos');

var _GameInfos2 = _interopRequireDefault(_GameInfos);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Common = require('../helpers/Common');

var _Chat = require('../../containers/forms/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerStatesContainer = _Common.FullSizeContainer.extend(_templateObject);

var NoPlayers = function NoPlayers() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { style: { color: _global2.default.color.primary } },
    _react2.default.createElement(
      _Common.Paragraph,
      { padding: _global2.default.padding.md, gameFont: true, center: true },
      'THERE ARE NO OTHER PLAYERS'
    ),
    _react2.default.createElement(
      _Common.Paragraph,
      { padding: _global2.default.padding.md, gameFont: true, center: true },
      'PLAY WITH YOUR FRIENDS!'
    )
  );
};

var PlayerStates = function PlayerStates(_ref) {
  var players = _ref.players;
  return _react2.default.createElement(
    PlayerStatesContainer,
    null,
    players.map(function (player, index) {
      return _react2.default.createElement(
        _Common.FlexContainer,
        { flex: true, key: index, padding: '10px' },
        _react2.default.createElement(_Common.FlexSpacer, null),
        _react2.default.createElement(_PlayerState2.default, { player: player }),
        _react2.default.createElement(_Common.FlexSpacer, null)
      );
    })
  );
};

var RightSideTop = _styledComponents2.default.div(_templateObject2, _global2.default.font.family.game, _global2.default.font.size.subtitle, _global2.default.color.primary);

var RightSideContainer = _Common.LightContainer.extend(_templateObject3);

var RightSide = function RightSide(_ref2) {
  var players = _ref2.players;

  return _react2.default.createElement(
    RightSideContainer,
    null,
    players.length ? _react2.default.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }
      },
      _react2.default.createElement(
        'div',
        {
          style: {
            flex: 1,
            overflow: 'scroll',
            minHeight: '210px',
            maxHeight: '210px'
          }
        },
        _react2.default.createElement(
          RightSideTop,
          null,
          'PLAYERS'
        ),
        _react2.default.createElement(PlayerStates, { players: players })
      ),
      _react2.default.createElement(_Chat2.default, null)
    ) : _react2.default.createElement(NoPlayers, null)
  );
};

exports.default = RightSide;