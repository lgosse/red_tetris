'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePlayer = exports.updatePlayer = exports.getPlayer = undefined;

var _actionsTypes = require('../../actionsTypes');

var getPlayer = exports.getPlayer = function getPlayer() {
  return {
    type: _actionsTypes.PLAYER_GET
  };
};

var updatePlayer = exports.updatePlayer = function updatePlayer(player) {
  return {
    type: _actionsTypes.PLAYER_UPDATE,
    player: player
  };
};

var savePlayer = exports.savePlayer = function savePlayer(player) {
  return {
    type: _actionsTypes.PLAYER_SAVE,
    player: player
  };
};