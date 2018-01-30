import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  PARTY_ADD,
  PARTY_JOIN,
  ALERT_POP
} from "../../actionsTypes";
import { push } from "react-router-redux";
import mongoose from "mongoose";

const Party = mongoose.model("Party", {
  name: {
    type: String,
    unique: true
  },
  size: Number,
  open: Boolean,
  players: [
    {
      nickname: String,
      id: String
    }
  ]
});

const getParties = async () => {
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

    // Change logic here to create party with model
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
      console.log(action.player);
      const party = await Party.findOne({ name: action.party.name }).exec();
      console.log(partyList);

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
      console.log("partyEdit", partyEdit);

      if (
        partyEdit.players.length < partyEdit.size &&
        party.players.filter(player => player.id === socket.id).length === 0
      ) {
        partyEdit.players.push({ ...action.player, id: socket.id, open: true });
        partyEdit.save();
        io.emit("action", await getParties());
      }

      break;
    }
  }
};

export default partyList;
