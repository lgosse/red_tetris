"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = require("./Home");

var _Home2 = _interopRequireDefault(_Home);

var _Ranking = require("./Ranking");

var _Ranking2 = _interopRequireDefault(_Ranking);

var _NotFound = require("./NotFound");

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Home: _Home2.default,
  Ranking: _Ranking2.default,
  NotFound: _NotFound2.default
};