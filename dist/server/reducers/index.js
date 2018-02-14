'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _partyList = require('./partyList');

var _partyList2 = _interopRequireDefault(_partyList);

var _party = require('./party');

var _party2 = _interopRequireDefault(_party);

var _rankingList = require('./rankingList');

var _rankingList2 = _interopRequireDefault(_rankingList);

var _ping = require('./ping');

var _ping2 = _interopRequireDefault(_ping);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = {
  rankingList: _rankingList2.default,
  partyList: _partyList2.default,
  party: _party2.default,
  ping: _ping2.default,
  game: _game2.default
};

exports.default = reducers;