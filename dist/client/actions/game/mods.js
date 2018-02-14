"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMod = undefined;

var _actionsTypes = require("../../../actionsTypes");

var setMod = exports.setMod = function setMod(mod) {
  return {
    type: _actionsTypes.GAME_MODS_SET,
    mod: mod
  };
};