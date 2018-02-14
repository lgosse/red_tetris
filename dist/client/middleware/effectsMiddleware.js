'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../actionsTypes');

var effectsMiddleware = function effectsMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      switch (action.type) {
        case _actionsTypes.ALERT_POP:
          {
            setTimeout(function () {
              dispatch({ type: _actionsTypes.ALERT_RESET });
            }, 3000);

            break;
          }
      }

      return next(action);
    };
  };
};

exports.default = effectsMiddleware;