import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  PARTY_ADD,
  PARTY_JOIN,
  ALERT_POP,
  PARTY_UPDATE,
  PARTY_LEAVE,
  PARTY_KICK_PLAYER,
  PARTY_OPEN,
  PARTY_TOGGLE_PLAYING,
  PARTY_LEFT
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
  playing: Boolean,
  players: [
    {
      nickname: String,
      socketId: String
    }
  ]
});

export const userLeaves = async (io, socket) => {
  let partyList;
  try {
    partyList = await Party.find({
      "players.socketId": socket.id
    }).exec();
  } catch (error) {
    console.log(error);
  }

  if (partyList.length === 0 || partyList.forEach === undefined) return;

  partyList.forEach(async party => {
    party.players = party.players.filter(player => {
      if (player.socketId === socket.id) {
        socket.leave(party._id, err => {
          if (err) console.log(err);
          socket.emit("action", { type: PARTY_LEFT });
        });

        return false;
      }

      return true;
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

  io.emit("action", await getParties());
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
        party = await new Party({
          ...action.party,
          open: false,
          playing: false
        }).save();
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
      socket.emit("action", push(`/#${party.name}[${action.player.nickname}]`));
      break;
    }

    case PARTY_JOIN: {
      let party;
      try {
        party = await Party.findOne({ name: action.party.name }).exec();
      } catch (error) {
        console.log(error);
      }

      let partyEdit;
      if (!party) {
        partyEdit = await new Party({
          ...action.party,
          size: 10,
          players: [],
          open: false,
          playing: false
        }).save();
      } else {
        partyEdit = party;
      }

      if (
        partyEdit.players.length < partyEdit.size &&
        partyEdit.players.filter(player => player.socketId === socket.id)
          .length === 0
      ) {
        partyEdit.players.push({
          ...action.player,
          socketId: socket.id
        });
        partyEdit.save();
        io.emit("action", await getParties());
      } else if (
        partyEdit.players.filter(player => player.socketId === socket.id)
          .length !== 0
      ) {
        partyEdit.players = partyEdit.players.map(
          player =>
            player.socketId === socket.id
              ? { ...player, ...action.player }
              : player
        );
        partyEdit.save();
        io.emit("action", await getParties());
      }

      socket.join(partyEdit._id, () => {
        io.to(partyEdit._id).emit("action", {
          type: PARTY_UPDATE,
          party: partyEdit
        });
      });

      break;
    }

    case PARTY_LEAVE: {
      userLeaves(io, socket);
      break;
    }

    case PARTY_KICK_PLAYER: {
      if (io.sockets.connected[action.playerId])
        io.sockets.connected[action.playerId].emit("action", push("/"));

      break;
    }

    case PARTY_OPEN: {
      let party;
      try {
        party = await Party.findById(action.partyId).exec();
      } catch (error) {
        console.log(error);
      }
      if (!party) return;

      party.open = !party.open;
      party.save().then(async res => {
        io.emit("action", await getParties());
        io.to(party._id).emit("action", {
          type: PARTY_UPDATE,
          party
        });
      });

      break;
    }

    case PARTY_TOGGLE_PLAYING: {
      let party;
      try {
        party = await Party.findById(action.partyId).exec();
      } catch (error) {
        console.log(error);
      }
      if (!party) return;

      party.open = false;
      party.playing = true;
      try {
        await party.save();
        io.emit("action", await getParties());
        io.to(party._id).emit("action", {
          type: PARTY_UPDATE,
          party
        });
      } catch (error) {
        console.log(error);
      }
    }

    case "PARTY_DELETE_ALL": {
      try {
        await Party.remove({}).exec();
      } catch (error) {
        console.error(error);
      }

      break;
    }
  }
};

export default partyList;
