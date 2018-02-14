'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = exports.gameSchema = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Player = require('../models/Player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    unique: true
  },
  size: Number,
  open: Boolean,
  playing: Boolean,
  players: [_Player.playerSchema],
  withBonus: Boolean
});

var Game = function () {
  function Game(_ref) {
    var name = _ref.name,
        size = _ref.size,
        _ref$withBonus = _ref.withBonus,
        withBonus = _ref$withBonus === undefined ? false : _ref$withBonus;
    (0, _classCallCheck3.default)(this, Game);

    this.name = name;
    this.size = size;
    this.open = false;
    this.playing = false;
    this.players = [];
    this.withBonus = withBonus;
  }

  (0, _createClass3.default)(Game, [{
    key: 'toggleOpen',
    value: function toggleOpen() {
      this.open = !this.open;
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.playing = true;
      this.open = false;
    }
  }, {
    key: 'stopGame',
    value: function stopGame() {
      this.playing = false;
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(player) {
      this.players.push(player);
    }
  }, {
    key: 'removePlayer',
    value: function removePlayer(socketId) {
      this.players = this.players.filter(function (player) {
        return player.socketId !== socketId;
      });
    }
  }, {
    key: 'updatePlayer',
    value: function updatePlayer(newPlayer) {
      this.players = this.players.map(function (player) {
        if (player.socketId === newPlayer.socketId) {
          player.update(newPlayer);
        }

        return player;
      });
    }
  }, {
    key: 'findAlivePlayers',
    value: function findAlivePlayers() {
      return this.players.filter(function (player) {
        return player.lose === false;
      });
    }
  }, {
    key: 'getPlayerBySocketId',
    value: function getPlayerBySocketId(socketId) {
      return this.players.find(function (player) {
        return player.socketId === socketId;
      });
    }
  }, {
    key: 'isOver',
    value: function isOver() {
      return this.solo === true || this.findAlivePlayers().length >= this.players.length - 1;
    }
  }, {
    key: 'solo',
    get: function get() {
      return this.players.length === 1;
    }
  }]);
  return Game;
}();

gameSchema.loadClass(Game);

var GameModel = _mongoose2.default.model('Game', gameSchema);

exports.gameSchema = gameSchema;
exports.Game = Game;
exports.default = GameModel;