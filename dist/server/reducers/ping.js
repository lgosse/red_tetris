"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require("../../actionsTypes");

var ping = function ping(action, io, socket) {
  switch (action.type) {
    case _actionsTypes.SERVER_PING:
      {
        socket.emit("action", { type: "pong" });
        break;
      }
  }
};

exports.default = ping;