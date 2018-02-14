'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Ranking = require('../models/Ranking');

var _Ranking2 = _interopRequireDefault(_Ranking);

var _actionsTypes = require('../../actionsTypes');

var _rankings = require('../../client/actions/rankings');

var _alert = require('../../client/actions/alert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rankingList = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, io, socket) {
    var _rankingList;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action.type;
            _context.next = _context.t0 === _actionsTypes.RANKINGS_LIST ? 3 : 17;
            break;

          case 3:
            _rankingList = void 0;
            _context.prev = 4;
            _context.next = 7;
            return _Ranking2.default.findHighestRankings().exec();

          case 7:
            _rankingList = _context.sent;
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t1 = _context['catch'](4);

            console.error(_context.t1);

          case 13:
            if (_rankingList) {
              _context.next = 16;
              break;
            }

            socket.emit('action', (0, _alert.alert)('An error occured, please try again.'));

            return _context.abrupt('return');

          case 16:

            socket.emit('action', (0, _rankings.getRankingListSuccess)(_rankingList));

          case 17:
            return _context.abrupt('return');

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 10]]);
  }));

  return function rankingList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = rankingList;