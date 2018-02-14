'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Party = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _global = require('../../styles/global');

var _global2 = _interopRequireDefault(_global);

var _Lobby = require('./Lobby');

var _Lobby2 = _interopRequireDefault(_Lobby);

var _Game = require('../game/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Party = exports.Party = function Party(_ref) {
  var party = _ref.party;
  return party.playing ? _react2.default.createElement(_Game2.default, null) : _react2.default.createElement(_Lobby2.default, null);
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var party = _ref2.party;
  return { party: party };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Party);