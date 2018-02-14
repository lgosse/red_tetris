'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lobby = exports.BeginPartyButton = exports.TogglePartyOpenButton = exports.RoomView = exports.PlayersList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _party = require('../../actions/party');

var _Chat = require('../forms/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _Common = require('../../components/helpers/Common');

var _RedTetrisHeader = require('../../components/home/RedTetrisHeader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayersList = exports.PlayersList = function PlayersList(_ref) {
  var _ref$players = _ref.players,
      players = _ref$players === undefined ? [] : _ref$players,
      kickPlayer = _ref.kickPlayer,
      actualPlayer = _ref.actualPlayer;
  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    players.map(function (player, index) {
      return _react2.default.createElement(
        _Common.FlexContainer,
        { key: index },
        _react2.default.createElement(_Common.FlexSpacer, null),
        _react2.default.createElement(
          'div',
          {
            style: {
              color: _global2.default.color.primary,
              border: '1px solid ' + _global2.default.color.primary,
              padding: _global2.default.padding.md,
              margin: _global2.default.padding.sm,
              display: 'flex',
              flexDirection: 'row',
              width: '200px'
            }
          },
          _react2.default.createElement(
            _Common.Paragraph,
            { gameFont: true },
            player.nickname
          ),
          _react2.default.createElement(_Common.FlexSpacer, null),
          players[0].socketId === actualPlayer.socketId && _react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return kickPlayer(player.socketId);
              } },
            _react2.default.createElement(_Common.Icon, { clickable: true, className: 'times' })
          )
        ),
        _react2.default.createElement(_Common.FlexSpacer, null)
      );
    })
  );
};

var RoomView = exports.RoomView = function RoomView(_ref2) {
  var party = _ref2.party,
      kickPlayer = _ref2.kickPlayer,
      player = _ref2.player;
  return _react2.default.createElement(
    _Common.FlexContainer,
    null,
    _react2.default.createElement(
      _RedTetrisHeader.Container,
      { width: '200px' },
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' }),
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' })
      ),
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' }),
        _react2.default.createElement(_RedTetrisHeader.EmptyBlock, null)
      ),
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' }),
        _react2.default.createElement(_RedTetrisHeader.EmptyBlock, null)
      )
    ),
    _react2.default.createElement(_Common.FlexSpacer, null),
    _react2.default.createElement(
      _Common.FullSizeContainer,
      null,
      _react2.default.createElement(
        _Common.Paragraph,
        { gameFont: true, color: 'primary', size: '26px', bold: true, center: true },
        party.name
      ),
      _react2.default.createElement(PlayersList, {
        style: { padding: '20px' },
        kickPlayer: kickPlayer,
        players: party.players,
        actualPlayer: player
      })
    ),
    _react2.default.createElement(_Common.FlexSpacer, null),
    _react2.default.createElement(
      _RedTetrisHeader.Container,
      { width: '200px' },
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' }),
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' })
      ),
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.EmptyBlock, null),
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' })
      ),
      _react2.default.createElement(
        _RedTetrisHeader.Line,
        null,
        _react2.default.createElement(_RedTetrisHeader.EmptyBlock, null),
        _react2.default.createElement(_RedTetrisHeader.Block, { backgroundColor: 'primary' })
      )
    )
  );
};

var TogglePartyOpenButton = exports.TogglePartyOpenButton = function TogglePartyOpenButton(_ref3) {
  var player = _ref3.player,
      party = _ref3.party,
      toggleOpenParty = _ref3.toggleOpenParty;

  if (party.players && party.players[0] && player.socketId === party.players[0].socketId) {
    return party.open ? _react2.default.createElement(
      _Common.Button,
      {
        style: { margin: _global2.default.padding.md },
        primary: true,
        onClick: function onClick() {
          return toggleOpenParty(party._id);
        }
      },
      'CLOSE PARTY'
    ) : _react2.default.createElement(
      _Common.Button,
      {
        style: { margin: _global2.default.padding.md },
        primary: true,
        onClick: function onClick() {
          return toggleOpenParty(party._id);
        }
      },
      'OPEN PARTY'
    );
  } else {
    return _react2.default.createElement('div', null);
  }
};

var BeginPartyButton = exports.BeginPartyButton = function BeginPartyButton(_ref4) {
  var party = _ref4.party,
      player = _ref4.player,
      beginParty = _ref4.beginParty;
  return party.players && party.players[0] && player.socketId === party.players[0].socketId ? _react2.default.createElement(
    _Common.Button,
    {
      style: { margin: _global2.default.padding.md },
      primary: true,
      onClick: function onClick() {
        return beginParty(party._id);
      }
    },
    'BEGIN PARTY'
  ) : _react2.default.createElement('div', null);
};

var Lobby = exports.Lobby = function Lobby(_ref5) {
  var party = _ref5.party,
      kickPlayer = _ref5.kickPlayer,
      player = _ref5.player,
      toggleOpenParty = _ref5.toggleOpenParty,
      beginParty = _ref5.beginParty;

  return _react2.default.createElement(
    _Common.FullSizeContainer,
    null,
    _react2.default.createElement(
      _Common.LightContainer,
      { padding: '20px' },
      _react2.default.createElement(RoomView, { kickPlayer: kickPlayer, party: party, player: player })
    ),
    _react2.default.createElement(
      _Common.FlexContainer,
      null,
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(TogglePartyOpenButton, {
        party: party,
        player: player,
        toggleOpenParty: toggleOpenParty
      }),
      _react2.default.createElement(BeginPartyButton, {
        party: party,
        player: player,
        beginParty: beginParty
      }),
      _react2.default.createElement(_Common.FlexSpacer, null)
    ),
    party.players && party.players.length > 1 && _react2.default.createElement(
      _Common.FlexContainer,
      { style: { maxHeight: '300px' }, flex: true },
      _react2.default.createElement(_Common.FlexSpacer, null),
      _react2.default.createElement(_Chat2.default, null),
      _react2.default.createElement(_Common.FlexSpacer, null)
    )
  );
};

var mapStateToProps = function mapStateToProps(_ref6) {
  var party = _ref6.party,
      player = _ref6.player;
  return {
    party: party,
    player: player
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    kickPlayer: function kickPlayer(playerId) {
      return dispatch((0, _party.kickPlayer)(playerId));
    },
    toggleOpenParty: function toggleOpenParty(partyId) {
      return dispatch((0, _party.toggleOpenParty)(partyId));
    },
    beginParty: function beginParty(partyId) {
      return dispatch((0, _party.startParty)(partyId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Lobby);