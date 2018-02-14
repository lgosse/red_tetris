'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParties = exports.userLeaves = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Game = require('../models/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Player = require('../models/Player');

var _actionsTypes = require('../../actionsTypes');

var _reactRouterRedux = require('react-router-redux');

var _party4 = require('../../client/actions/party');

var _pieces = require('../../client/actions/game/pieces');

var _Piece = require('../models/Piece');

var _utils = require('../../client/reducers/game/utils');

var _board = require('../../client/actions/game/board');

var _score = require('../../client/actions/game/score');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Actions
var userLeaves = exports.userLeaves = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(io, socket) {
    var party;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (socket.partyId) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return');

          case 2:
            party = void 0;
            _context.prev = 3;
            _context.next = 6;
            return _Game2.default.findById(socket.partyId).exec();

          case 6:
            party = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);

            console.error(_context.t0);

          case 12:
            if (party) {
              _context.next = 15;
              break;
            }

            console.error('Party ' + socket.partyId + ' not found!');
            return _context.abrupt('return');

          case 15:

            if (party.getPlayerBySocketId(socket.id)) {
              party.removePlayer(socket.id);
              delete socket.partyId;
              socket.leave(party._id, function (err) {
                if (err) console.error(err);
                socket.emit('action', { type: _actionsTypes.PARTY_LEFT });
              });
            }

            if (!(party.players.length === 0)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return party.remove();

          case 19:
            _context.next = 23;
            break;

          case 21:
            _context.next = 23;
            return party.save();

          case 23:

            io.to(party._id).emit('action', {
              type: _actionsTypes.PARTY_UPDATE,
              party: party
            });

            _context.t1 = io;
            _context.next = 27;
            return getParties();

          case 27:
            _context.t2 = _context.sent;

            _context.t1.emit.call(_context.t1, 'action', _context.t2);

          case 29:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 9]]);
  }));

  return function userLeaves(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Action Types
// Models
var getParties = exports.getParties = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var partyList;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Game2.default.find({}).exec();

          case 2:
            partyList = _context2.sent;
            return _context2.abrupt('return', {
              type: _actionsTypes.RESPONSE_PARTY_LIST,
              partyList: partyList
            });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getParties() {
    return _ref2.apply(this, arguments);
  };
}();

var partyList = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, io, socket) {
    var party, _party, partyEdit, _party2, _party3;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = action.type;
            _context4.next = _context4.t0 === _actionsTypes.PARTY_LIST ? 3 : _context4.t0 === _actionsTypes.PARTY_ADD ? 9 : _context4.t0 === _actionsTypes.PARTY_JOIN ? 40 : _context4.t0 === _actionsTypes.PARTY_LEAVE ? 83 : _context4.t0 === _actionsTypes.PARTY_KICK_PLAYER ? 85 : _context4.t0 === _actionsTypes.PARTY_OPEN ? 87 : _context4.t0 === _actionsTypes.PARTY_START ? 102 : _context4.t0 === 'PARTY_DELETE_ALL' ? 135 : 144;
            break;

          case 3:
            _context4.t1 = socket;
            _context4.next = 6;
            return getParties();

          case 6:
            _context4.t2 = _context4.sent;

            _context4.t1.emit.call(_context4.t1, 'action', _context4.t2);

            return _context4.abrupt('break', 144);

          case 9:
            party = void 0;
            _context4.prev = 10;
            _context4.next = 13;
            return _Game2.default.findOne({ name: action.party.name }).exec();

          case 13:
            party = _context4.sent;
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t3 = _context4['catch'](10);

            console.error(_context4.t3);

          case 19:
            if (!party) {
              _context4.next = 22;
              break;
            }

            socket.emit('action', {
              type: _actionsTypes.ALERT_POP,
              message: 'This party name is not available! Choose another one.'
            });

            return _context4.abrupt('return');

          case 22:
            _context4.prev = 22;
            _context4.next = 25;
            return new _Game2.default(new _Game.Game(action.party)).save();

          case 25:
            party = _context4.sent;
            _context4.next = 33;
            break;

          case 28:
            _context4.prev = 28;
            _context4.t4 = _context4['catch'](22);

            console.error(_context4.t4);
            socket.emit('action', {
              type: _actionsTypes.ALERT_POP,
              message: 'An error occured. Cannot save the party'
            });

            return _context4.abrupt('break', 144);

          case 33:
            _context4.t5 = io;
            _context4.next = 36;
            return getParties();

          case 36:
            _context4.t6 = _context4.sent;

            _context4.t5.emit.call(_context4.t5, 'action', _context4.t6);

            socket.emit('action', (0, _reactRouterRedux.push)('/#' + party.name + '[' + action.player.nickname + ']'));
            return _context4.abrupt('break', 144);

          case 40:
            _party = void 0;
            _context4.prev = 41;
            _context4.next = 44;
            return _Game2.default.findOne({ name: action.party.name }).exec();

          case 44:
            _party = _context4.sent;
            _context4.next = 50;
            break;

          case 47:
            _context4.prev = 47;
            _context4.t7 = _context4['catch'](41);

            console.error(_context4.t7);

          case 50:
            partyEdit = void 0;

            if (_party) {
              _context4.next = 64;
              break;
            }

            _context4.prev = 52;
            _context4.next = 55;
            return new _Game2.default(new _Game.Game(action.party));

          case 55:
            partyEdit = _context4.sent;
            _context4.next = 61;
            break;

          case 58:
            _context4.prev = 58;
            _context4.t8 = _context4['catch'](52);

            console.error(_context4.t8);

          case 61:

            if (!partyEdit) socket.emit('action', {
              type: _actionsTypes.ALERT_POP,
              message: 'A problem occured while trying to join your party.'
            });
            _context4.next = 65;
            break;

          case 64:
            partyEdit = _party;

          case 65:
            if (!(partyEdit.players.length < partyEdit.size)) {
              _context4.next = 80;
              break;
            }

            partyEdit.addPlayer(new _Player.Player((0, _extends3.default)({}, action.player, {
              socketId: socket.id
            })));

            _context4.prev = 67;
            _context4.next = 70;
            return partyEdit.save();

          case 70:
            _context4.next = 75;
            break;

          case 72:
            _context4.prev = 72;
            _context4.t9 = _context4['catch'](67);

            console.error(_context4.t9);

          case 75:
            _context4.t10 = io;
            _context4.next = 78;
            return getParties();

          case 78:
            _context4.t11 = _context4.sent;

            _context4.t10.emit.call(_context4.t10, 'action', _context4.t11);

          case 80:

            socket.partyId = partyEdit._id;
            socket.join(partyEdit._id, function () {
              io.to(partyEdit._id).emit('action', {
                type: _actionsTypes.PARTY_UPDATE,
                party: partyEdit
              });
            });

            return _context4.abrupt('break', 144);

          case 83:
            userLeaves(io, socket);
            return _context4.abrupt('break', 144);

          case 85:
            if (io.sockets.connected[action.playerId]) io.sockets.connected[action.playerId].emit('action', (0, _reactRouterRedux.push)('/'));

            return _context4.abrupt('break', 144);

          case 87:
            _party2 = void 0;
            _context4.prev = 88;
            _context4.next = 91;
            return _Game2.default.findById(action.partyId).exec();

          case 91:
            _party2 = _context4.sent;
            _context4.next = 97;
            break;

          case 94:
            _context4.prev = 94;
            _context4.t12 = _context4['catch'](88);

            console.error(_context4.t12);

          case 97:
            if (_party2) {
              _context4.next = 99;
              break;
            }

            return _context4.abrupt('return');

          case 99:

            _party2.toggleOpen();
            _party2.save().then(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(res) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = io;
                        _context3.next = 3;
                        return getParties();

                      case 3:
                        _context3.t1 = _context3.sent;

                        _context3.t0.emit.call(_context3.t0, 'action', _context3.t1);

                        io.to(_party2._id).emit('action', {
                          type: _actionsTypes.PARTY_UPDATE,
                          party: _party2
                        });

                      case 6:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x6) {
                return _ref4.apply(this, arguments);
              };
            }());

            return _context4.abrupt('break', 144);

          case 102:
            _party3 = void 0;
            _context4.prev = 103;
            _context4.next = 106;
            return _Game2.default.findById(action.partyId).exec();

          case 106:
            _party3 = _context4.sent;
            _context4.next = 112;
            break;

          case 109:
            _context4.prev = 109;
            _context4.t13 = _context4['catch'](103);

            console.error(_context4.t13);

          case 112:
            if (_party3) {
              _context4.next = 114;
              break;
            }

            return _context4.abrupt('return');

          case 114:

            _party3.startGame();

            _context4.prev = 115;
            _context4.next = 118;
            return _party3.save();

          case 118:
            _context4.t14 = io;
            _context4.next = 121;
            return getParties();

          case 121:
            _context4.t15 = _context4.sent;

            _context4.t14.emit.call(_context4.t14, 'action', _context4.t15);

            io.to(_party3._id).emit('action', (0, _board.updateBoard)({ grid: (0, _utils.gridZero)(10, 20) }));
            io.to(_party3._id).emit('action', (0, _score.resetScore)(0));
            io.to(_party3._id).emit('action', (0, _party4.updateParty)(_party3));
            io.to(_party3._id).emit('action', (0, _pieces.updatePiecesGame)({ piece: new _Piece.Piece() }));
            io.to(_party3._id).emit('action', (0, _pieces.claimPieceSuccess)([new _Piece.Piece(), new _Piece.Piece()]));
            io.to(_party3._id).partyInterval = setInterval(function () {
              io.to(_party3._id).emit('action', (0, _pieces.movePieceServer)(0));
            }, 1000);
            _context4.next = 134;
            break;

          case 131:
            _context4.prev = 131;
            _context4.t16 = _context4['catch'](115);

            console.error(_context4.t16);

          case 134:
            return _context4.abrupt('break', 144);

          case 135:
            _context4.prev = 135;
            _context4.next = 138;
            return _Game2.default.remove({}).exec();

          case 138:
            _context4.next = 143;
            break;

          case 140:
            _context4.prev = 140;
            _context4.t17 = _context4['catch'](135);

            console.error(_context4.t17);

          case 143:
            return _context4.abrupt('break', 144);

          case 144:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[10, 16], [22, 28], [41, 47], [52, 58], [67, 72], [88, 94], [103, 109], [115, 131], [135, 140]]);
  }));

  return function partyList(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = partyList;