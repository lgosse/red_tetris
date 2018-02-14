'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToPartyListProps = exports.PartyList = exports.PartyButton = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRouterDom = require('react-router-dom');

var _server = require('../../actions/server');

var _Common = require('../../components/helpers/Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PartyButton = exports.PartyButton = function PartyButton(_ref) {
  var party = _ref.party,
      player = _ref.player,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    _reactRouterDom.Link,
    {
      to: '/#' + party.name + '[' + (player.nickname || 'Unknown') + ']',
      style: !party.open ? {
        textDecoration: 'none',
        pointerEvents: 'none'
      } : {
        textDecoration: 'none'
      }
    },
    _react2.default.createElement(
      _Common.Button,
      {
        width: '400px',
        primary: true,
        margin: '10px',
        disabled: !party.open,
        style: {
          display: 'flex',
          flexDirection: 'row'
        },
        className: 'join-button'
      },
      _react2.default.createElement(
        'div',
        { style: { flex: 1, textAlign: 'left' } },
        party.name
      ),
      _react2.default.createElement(
        'div',
        null,
        'Players: ',
        party.players.length,
        ' / ',
        party.size
      ),
      party.withBonus && _react2.default.createElement(_Common.Icon, { marginTop: '-2px', marginLeft: '5px', className: 'bomb' })
    )
  );
};

var PartyListMap = function PartyListMap(_ref2) {
  var partyList = _ref2.partyList,
      player = _ref2.player;
  return _react2.default.createElement(
    'div',
    null,
    partyList.map(function (party) {
      return _react2.default.createElement(PartyButton, { party: party, key: party._id, player: player });
    })
  );
};

var NoParties = function NoParties() {
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    _react2.default.createElement(
      _Common.Paragraph,
      { gameFont: true, center: true, color: 'accent', size: '20px' },
      _react2.default.createElement(
        'div',
        null,
        'No room are actually available'
      ),
      _react2.default.createElement(
        _reactRouterDom.Link,
        { to: 'create-party', id: 'new-game-link' },
        _react2.default.createElement(
          _Common.Button,
          { primary: true, margin: '20px' },
          'Create one here'
        )
      )
    )
  );
};

var PartyList = exports.PartyList = function PartyList(_ref3) {
  var partyList = _ref3.partyList,
      player = _ref3.player;

  return _react2.default.createElement(
    _Common.FullSizeContainer,
    { padding: '40px' },
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(
        'div',
        null,
        partyList.length ? _react2.default.createElement(PartyListMap, { partyList: partyList, player: player }) : _react2.default.createElement(NoParties, null)
      ),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

var mapStateToPartyListProps = exports.mapStateToPartyListProps = function mapStateToPartyListProps(_ref4) {
  var partyList = _ref4.partyList,
      player = _ref4.player;
  return {
    partyList: partyList,
    player: player
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToPartyListProps)(PartyList);