"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParties = undefined;

var _actionsTypes = require("../../actionsTypes");

var getParties = exports.getParties = function getParties() {
  return {
    type: _actionsTypes.PARTY_LIST
  };
};