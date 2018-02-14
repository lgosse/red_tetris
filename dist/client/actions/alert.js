"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = undefined;

var _actionsTypes = require("../../actionsTypes");

var alert = exports.alert = function alert(message) {
  return {
    type: _actionsTypes.ALERT_POP,
    message: message
  };
};