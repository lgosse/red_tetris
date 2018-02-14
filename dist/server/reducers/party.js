'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsTypes = require('../../actionsTypes');

var _party = require('../../client/actions/party');

var party = function party(action, io, socket) {
  switch (action.type) {
    case _actionsTypes.PARTY_SEND_MESSAGE:
      {
        if (!socket.partyId) return;

        io.to(socket.partyId).emit('action', (0, _party.receiveMessage)(action.message.text, action.message.player, socket.id));
        break;
      }
  }
};

exports.default = party;