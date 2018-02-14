"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require("../../actionsTypes");

var partyList = function partyList() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.PARTY_LIST:
      return state;

    case _actionsTypes.RESPONSE_PARTY_LIST:
      return action.partyList || [];

    default:
      return state;
  }
};

exports.default = partyList;