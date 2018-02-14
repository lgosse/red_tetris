'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameLose = undefined;

var _actionsTypes = require('../../../actionsTypes');

var gameLose = exports.gameLose = function gameLose() {
  return function (dispatch, getState) {
    return dispatch({
      type: _actionsTypes.GAME_LOSE,
      score: getState().game.score
    });
  };
};