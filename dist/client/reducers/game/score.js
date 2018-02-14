'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../../actionsTypes');

var score = function score() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.GAME_SCORE_RESET:
      {
        return action.score;
      }

    case _actionsTypes.GAME_SCORE_UPDATE:
      {
        return state + action.score;
      }

    default:
      return state;
  }
};

exports.default = score;