'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePartyHash = exports.receiveMessage = exports.sendMessage = exports.startParty = exports.toggleOpenParty = exports.kickPlayer = exports.updateParty = exports.leaveParty = exports.joinParty = exports.addParty = exports.saveParty = exports.getParty = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _actionsTypes = require('../../actionsTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParty = exports.getParty = function getParty() {
  return {
    type: _actionsTypes.PARTY_GET
  };
};

var saveParty = exports.saveParty = function saveParty(party) {
  return {
    type: _actionsTypes.PARTY_SAVE,
    party: party
  };
};

var addParty = exports.addParty = function addParty(party, player) {
  return {
    type: _actionsTypes.PARTY_ADD,
    party: party,
    player: player
  };
};

var joinParty = exports.joinParty = function joinParty(party, player) {
  return {
    type: _actionsTypes.PARTY_JOIN,
    party: party,
    player: player
  };
};

var leaveParty = exports.leaveParty = function leaveParty() {
  return {
    type: _actionsTypes.PARTY_LEAVE
  };
};

var updateParty = exports.updateParty = function updateParty(party) {
  return {
    type: _actionsTypes.PARTY_UPDATE,
    party: party
  };
};

var kickPlayer = exports.kickPlayer = function kickPlayer(playerId) {
  return {
    type: _actionsTypes.PARTY_KICK_PLAYER,
    playerId: playerId
  };
};

var toggleOpenParty = exports.toggleOpenParty = function toggleOpenParty(partyId) {
  return {
    type: _actionsTypes.PARTY_OPEN,
    partyId: partyId
  };
};

var startParty = exports.startParty = function startParty(partyId) {
  return {
    type: _actionsTypes.PARTY_START,
    partyId: partyId
  };
};

var sendMessage = exports.sendMessage = function sendMessage(message) {
  return function (dispatch, getState) {
    dispatch({
      type: _actionsTypes.PARTY_SEND_MESSAGE,
      message: {
        text: message,
        player: getState().player.nickname
      }
    });
  };
};

var receiveMessage = exports.receiveMessage = function receiveMessage(text, senderName, senderId) {
  return {
    type: _actionsTypes.PARTY_RECEIVE_MESSAGE,
    message: {
      text: text,
      senderId: senderId,
      senderName: senderName
    }
  };
};

var validatePartyHash = exports.validatePartyHash = function validatePartyHash(partyHash) {
  var _partyHash$split = partyHash.split('['),
      _partyHash$split2 = (0, _slicedToArray3.default)(_partyHash$split, 2),
      partyName = _partyHash$split2[0],
      playerName = _partyHash$split2[1];

  if (partyName.length === 0) return false;

  if (!playerName || playerName.length === 1 || playerName.length === 0) return false;

  return true;
};