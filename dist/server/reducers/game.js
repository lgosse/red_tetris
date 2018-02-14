'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Game = require('../models/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Player = require('../models/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Ranking = require('../models/Ranking');

var _Ranking2 = _interopRequireDefault(_Ranking);

var _actionsTypes = require('../../actionsTypes');

var _pieces = require('../../client/actions/game/pieces');

var _Piece = require('../models/Piece');

var _score = require('../../client/actions/game/score');

var _party2 = require('../../client/actions/party');

var _alert = require('../../client/actions/alert');

var _utils = require('../../client/reducers/game/utils');

var _board = require('../../client/actions/game/board');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _game = require('../../client/actions/game/game');

var _rankings = require('../../client/actions/rankings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Actions
// Models
var game = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, io, socket) {
    var party, _party;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action.type;
            _context.next = _context.t0 === _actionsTypes.GAME_PIECES_CLAIM_PIECE ? 3 : _context.t0 === _actionsTypes.GAME_BOARD_NOTIFY_GRID_UPDATE ? 5 : _context.t0 === _actionsTypes.GAME_LOSE ? 33 : 75;
            break;

          case 3:
            io.to(socket.partyId).emit('action', (0, _pieces.claimPieceSuccess)(new _Piece.Piece()));

            return _context.abrupt('break', 76);

          case 5:
            if (socket.partyId) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return');

          case 7:
            party = void 0;
            _context.prev = 8;
            _context.next = 11;
            return _Game2.default.findById(socket.partyId).exec();

          case 11:
            party = _context.sent;
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t1 = _context['catch'](8);

            console.error(_context.t1);

          case 17:
            if (!(!party || !party.playing)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt('return');

          case 19:

            socket.emit('action', (0, _score.updateScore)(action.payload.nbLinesDestroyed ? 100 + 500 * Math.pow(2, action.payload.nbLinesDestroyed - 1) : 100));

            if (action.payload.nbLinesDestroyed - 1 > 0) {
              io.to(socket.partyId).emit('action', (0, _pieces.updateCurrentPiece)({ x: 4, y: 0 }));
              io.to(socket.partyId).emit('action', (0, _board.blockLinesServer)(action.payload.nbLinesDestroyed - 1, socket.id));
            }

            if (action.payload.nbLinesDestroyed > 2 && party.withBonus) {
              if (Math.trunc(Math.random() * 2) === 0 || party.solo) {
                socket.emit('action', (0, _pieces.gameAddBonus)(new _Piece.PieceBonus()));
              } else {
                io.to(party._id).emit('action', (0, _pieces.gameAddMalus)(socket.id, new _Piece.PieceMalus()));
              }
            }

            party.updatePlayer({
              socketId: socket.id,
              map: action.payload.grid
            });

            _context.prev = 23;
            _context.next = 26;
            return party.save();

          case 26:
            io.to(socket.partyId).emit('action', (0, _party2.updateParty)(party));
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t2 = _context['catch'](23);

            console.error(_context.t2);

          case 32:
            return _context.abrupt('break', 76);

          case 33:
            _party = void 0;
            _context.prev = 34;
            _context.next = 37;
            return _Game2.default.findById(socket.partyId).exec();

          case 37:
            _party = _context.sent;
            _context.next = 43;
            break;

          case 40:
            _context.prev = 40;
            _context.t3 = _context['catch'](34);

            console.error(_context.t3);

          case 43:
            if (_party) {
              _context.next = 46;
              break;
            }

            socket.emit('action', (0, _alert.alert)('An error occured, refresh and try again.'));

            return _context.abrupt('return');

          case 46:

            _party.updatePlayer({
              socketId: socket.id,
              map: (0, _utils.gridZero)(10, 20),
              lose: true
            });

            if (!_party.isOver()) {
              _context.next = 65;
              break;
            }

            if (!(_party.solo === true)) {
              _context.next = 59;
              break;
            }

            _context.prev = 49;
            _context.next = 52;
            return new _Ranking2.default(new _Ranking.Ranking({
              score: action.score + 100,
              playerName: _party.getPlayerBySocketId(socket.id).nickname
            })).save();

          case 52:
            _context.next = 57;
            break;

          case 54:
            _context.prev = 54;
            _context.t4 = _context['catch'](49);

            console.error(_context.t4);

          case 57:
            _context.next = 60;
            break;

          case 59:
            io.to(_party._id).emit('action', (0, _alert.alert)(_party.findAlivePlayers()[0].nickname + ' has won the game'));

          case 60:

            clearInterval(io.to(_party._id).partyInterval);
            _party.stopGame();
            setTimeout(function () {
              try {
                _party.save();
              } catch (error) {
                console.error(error);
              }
              io.to(_party._id).emit('action', (0, _party2.updateParty)(_party));
            }, 3000);
            _context.next = 74;
            break;

          case 65:
            _context.prev = 65;
            _context.next = 68;
            return _party.save();

          case 68:
            _context.next = 73;
            break;

          case 70:
            _context.prev = 70;
            _context.t5 = _context['catch'](65);

            console.error(_context.t5);

          case 73:
            io.to(_party._id).emit('action', (0, _party2.updateParty)(_party));

          case 74:
            return _context.abrupt('break', 76);

          case 75:
            return _context.abrupt('break', 76);

          case 76:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[8, 14], [23, 29], [34, 40], [49, 54], [65, 70]]);
  }));

  return function game(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// Action Types
exports.default = game;