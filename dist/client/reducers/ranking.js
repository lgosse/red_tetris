'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../actionsTypes');

var ranking = function ranking() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.RESPONSE_RANKINGS_LIST:
      return action.ranking;

    default:
      return state;
  }
};

exports.default = ranking;