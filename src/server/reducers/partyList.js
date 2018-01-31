import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  PARTY_ADD,
  PARTY_JOIN,
  ALERT_POP,
  PARTY_UPDATE,
  PARTY_LEAVE
} from "../../actionsTypes";
import { push } from "react-router-redux";
import mongoose from "mongoose";

export const Party = mongoose.model("Party", {
  name: {
    type: String,
    unique: true
  },
  size: Number,
  open: Boolean,
  players: [
    {
      nickname: String,
      socketId: String
    }
  ]
});

export const userLeaves = async socketId => {
  const partyList = await Party.find({
    "players.socketId": socketId
  });
  partyList.forEach(async party => {
    party.players = party.players.filter(player => {
      return player.socketId !== socketId;
    });

    if (party.players.length === 0) {
      await party.remove();
    } else {
      await party.save();
    }

    io.to(party._id).emit("action", {
      type: PARTY_UPDATE,
      party
    });
  });

  io.emit("action", getParties());
};

export const getParties = async () => {
  const partyList = await Party.find({}).exec();

  return {
    type: RESPONSE_PARTY_LIST,
    partyList
  };
};

const partyList = async (action, io, socket) => {
  switch (action.type) {
    case PARTY_LIST: {
      socket.emit("action", await getParties());
      break;
    }

    case PARTY_ADD: {
      let party;
      try {
        party = await new Party({ ...action.party, open: false }).save();
      } catch (error) {
        let message;
        switch (error.code) {
          case 11000:
            message = "This party name is not available! Choose another one.";
            break;
          default:
            message = "Cannot save the party";
            break;
        }
        socket.emit("action", {
          type: ALERT_POP,
          message
        });

        break;
      }

      io.emit("action", await getParties());
      socket.emit("action", push(`/#${party.name}`));
      break;
    }

    case PARTY_JOIN: {
      const party = await Party.findOne({ name: action.party.name }).exec();

      let partyEdit;
      if (!party) {
        partyEdit = await new Party({
          ...action.party,
          size: 10,
          players: [],
          open: false
        }).save();
      } else {
        partyEdit = party;
      }

      if (
        partyEdit.players.length < partyEdit.size &&
        partyEdit.players.filter(player => player.id === socket.id).length === 0
      ) {
        partyEdit.players.push({
          ...action.player,
          socketId: socket.id,
          open: true
        });
        partyEdit.save();
        io.emit("action", await getParties());
      }

      socket.join(partyEdit._id);
      io.to(partyEdit._id).emit("action", {
        type: PARTY_UPDATE,
        party: partyEdit
      });

      break;
    }

    case PARTY_LEAVE: {
      userLeaves(socket.id);
      break;
    }
  }
};

export default partyList;
