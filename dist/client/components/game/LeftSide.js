'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  font-family: ', ';\n  font-size: ', ';\n  color: ', ';\n  text-align: center;\n'], ['\n  font-family: ', ';\n  font-size: ', ';\n  color: ', ';\n  text-align: center;\n']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  overflow: scroll;\n  height: 80vh;\n  min-height: 80vh;\n'], ['\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  border-top-left-radius: 10px;\n  border-bottom-left-radius: 10px;\n  overflow: scroll;\n  height: 80vh;\n  min-height: 80vh;\n']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n  border: 5px solid ', ';\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  padding: ', ';\n  width: 100%;\n  font-family: ', ';\n  font-size: 14px;\n  color: ', ';\n  flex: 1;\n'], ['\n  border: 5px solid ', ';\n  border-top-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  padding: ', ';\n  width: 100%;\n  font-family: ', ';\n  font-size: 14px;\n  color: ', ';\n  flex: 1;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Tetri = require('./Tetri');

var _Common = require('../helpers/Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftSideTop = _styledComponents2.default.div(_templateObject, _global2.default.font.family.game, _global2.default.font.size.title, _global2.default.color.primary);

var LeftSideContainer = _Common.LightContainer.extend(_templateObject2);

var GameInfoContainer = _styledComponents2.default.div(_templateObject3, _global2.default.color.primary, _global2.default.padding.md, _global2.default.font.family.game, _global2.default.color.primary);

var GameInfo = function GameInfo(_ref) {
  var title = _ref.title,
      children = _ref.children,
      flex = _ref.flex;
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    {
      padding: _global2.default.padding.md,
      style: flex && {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    },
    _react2.default.createElement(
      'div',
      {
        style: {
          fontFamily: _global2.default.font.family.game,
          fontSize: _global2.default.font.size.subtitle,
          color: _global2.default.color.primary
        }
      },
      title
    ),
    _react2.default.createElement(
      GameInfoContainer,
      null,
      children
    )
  );
};

var LeftSide = function LeftSide(_ref2) {
  var party = _ref2.party,
      player = _ref2.player,
      game = _ref2.game;
  return _react2.default.createElement(
    LeftSideContainer,
    null,
    _react2.default.createElement(
      LeftSideTop,
      null,
      party.name
    ),
    _react2.default.createElement(
      GameInfo,
      { title: 'PLAYER' },
      player.nickname
    ),
    _react2.default.createElement(
      GameInfo,
      { title: 'SCORE' },
      game.score
    ),
    _react2.default.createElement(
      GameInfo,
      { title: 'NEXT PIECE', flex: true },
      _react2.default.createElement(
        _Common.FlexContainer,
        { height: '100%' },
        _react2.default.createElement(_Common.FlexSpacer, null),
        _react2.default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }
          },
          _react2.default.createElement('div', { style: { flex: 1 } }),
          game.pieces.next && game.pieces.next[0] ? _react2.default.createElement(_Tetri.Tetri, { padding: '12px', tetri: game.pieces.next[0].grid }) : _react2.default.createElement('div', null),
          _react2.default.createElement('div', { style: { flex: 1 } })
        ),
        _react2.default.createElement(_Common.FlexSpacer, null)
      )
    )
  );
};

exports.default = LeftSide;