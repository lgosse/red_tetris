'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = exports.playerSchema = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require('../../client/reducers/game/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerSchema = new _mongoose2.default.Schema({
  nickname: String,
  socketId: String,
  map: [[Number]],
  lose: Boolean
});

var Player = function () {
  function Player(_ref) {
    var nickname = _ref.nickname,
        socketId = _ref.socketId;
    (0, _classCallCheck3.default)(this, Player);

    this.nickname = nickname;
    this.socketId = socketId;
    this.map = (0, _utils.gridZero)(10, 20);
    this.lose = false;
  }

  (0, _createClass3.default)(Player, [{
    key: 'update',
    value: function update(newPlayer) {
      var _this = this;

      Object.keys(newPlayer).forEach(function (key) {
        _this[key] = newPlayer[key];
      });
    }
  }]);
  return Player;
}();

playerSchema.loadClass(Player);

exports.playerSchema = playerSchema;
exports.Player = Player;