'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require('../../actionsTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getParty = function getParty() {
  var partyItem = localStorage.getItem('party');
  if (partyItem) {
    return JSON.parse(partyItem);
  }
  return {};
};

var saveParty = function saveParty(action) {
  localStorage.setItem('party', JSON.stringify(action.party));
};

var initialState = { size: 10, players: [], messages: [], withBonus: false };

var party = function party() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.PARTY_GET:
      return getParty();
    case _actionsTypes.PARTY_SAVE:
      saveParty(action);
      return state;
    case _actionsTypes.PARTY_UPDATE:
      return action.party;
    case _actionsTypes.PARTY_LEFT:
      return initialState;
    case _actionsTypes.PARTY_RECEIVE_MESSAGE:
      return (0, _extends3.default)({}, state, {
        messages: state.messages && state.messages.length ? [].concat((0, _toConsumableArray3.default)(state.messages), [action.message]) : [action.message]
      });
    default:
      return state;
  }
};

exports.default = party;