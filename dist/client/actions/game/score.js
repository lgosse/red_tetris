'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateScore = exports.resetScore = undefined;

var _actionsTypes = require('../../../actionsTypes');

var resetScore = exports.resetScore = function resetScore(score) {
  return {
    type: _actionsTypes.GAME_SCORE_RESET,
    score: score
  };
};

var updateScore = exports.updateScore = function updateScore(score) {
  return {
    type: _actionsTypes.GAME_SCORE_UPDATE,
    score: score
  };
};