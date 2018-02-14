"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginfo = (0, _debug2.default)("tetris:ioReducer");

var ioReducer = function ioReducer(io, socket, action) {
  loginfo("Action type: " + action.type);
  Object.keys(_reducers2.default).map(function (reducerKey) {
    _reducers2.default[reducerKey](action, io, socket);
  });
};

exports.default = ioReducer;