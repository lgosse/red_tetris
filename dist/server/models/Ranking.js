'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ranking = exports.rankingSchema = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rankingSchema = new _mongoose2.default.Schema({
  score: Number,
  playerName: String,
  date: Date
});

var Ranking = function () {
  function Ranking(_ref) {
    var score = _ref.score,
        playerName = _ref.playerName;
    (0, _classCallCheck3.default)(this, Ranking);

    this.date = new Date();
    this.score = score;
    this.playerName = playerName;
  }

  (0, _createClass3.default)(Ranking, null, [{
    key: 'findHighestRankings',
    value: function findHighestRankings() {
      return this.find({}).sort('-score').limit(20);
    }
  }]);
  return Ranking;
}();

rankingSchema.loadClass(Ranking);
var RankingModel = _mongoose2.default.model('Ranking', rankingSchema);

exports.rankingSchema = rankingSchema;
exports.Ranking = Ranking;
exports.default = RankingModel;