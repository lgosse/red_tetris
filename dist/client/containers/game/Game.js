'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToGameProps = exports.Game = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _RightSide = require('../../components/game/RightSide');

var _RightSide2 = _interopRequireDefault(_RightSide);

var _LeftSide = require('../../components/game/LeftSide');

var _LeftSide2 = _interopRequireDefault(_LeftSide);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Common = require('../../components/helpers/Common');

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = exports.Game = function Game(_ref) {
  var party = _ref.party,
      player = _ref.player,
      game = _ref.game,
      winner = _ref.winner;
  return _react2.default.createElement(
    'div',
    {
      style: {
        width: '100%',
        paddingRight: '10%',
        paddingLeft: '10%',
        display: 'flex'
      }
    },
    _react2.default.createElement(_LeftSide2.default, { party: party, player: player, game: game }),
    _react2.default.createElement(_Grid2.default, { party: party, player: player }),
    _react2.default.createElement(_RightSide2.default, {
      players: party.players.filter(function (currentPlayer) {
        return player.socketId !== currentPlayer.socketId;
      })
    })
  );
};

var mapStateToGameProps = exports.mapStateToGameProps = function mapStateToGameProps(_ref2) {
  var party = _ref2.party,
      player = _ref2.player,
      game = _ref2.game;
  return {
    party: party,
    player: player,
    game: game
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToGameProps)(Game);