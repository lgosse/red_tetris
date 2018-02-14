"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionsTypes = require("../../../actionsTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mods = function mods() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actionsTypes.GAME_MODS_SET:
      {
        return (0, _extends3.default)({}, action.mod);
      }

    default:
      return state;
  }
};

exports.default = mods;