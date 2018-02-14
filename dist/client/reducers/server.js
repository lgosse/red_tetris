'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../actionsTypes');

var server = function server() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.SERVER_PING:
      return {};
    default:
      return state;
  }
};

exports.default = server;