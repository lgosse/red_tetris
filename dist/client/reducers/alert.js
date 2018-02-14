"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require("../../actionsTypes");

var alert = function alert() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.ALERT_POP:
      return { message: action.message };
    case _actionsTypes.ALERT_RESET:
      return {};
    default:
      return state;
  }
};

exports.default = alert;