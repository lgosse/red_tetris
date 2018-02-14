"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ping = undefined;

var _actionsTypes = require("../../actionsTypes");

var ping = exports.ping = function ping() {
  return {
    type: _actionsTypes.SERVER_PING
  };
};