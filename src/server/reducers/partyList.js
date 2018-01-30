import { PARTY_LIST, RESPONSE_PARTY_LIST, PARTY_ADD, PARTY_JOIN } from "../../actionsTypes";
import mongoose from "mongoose";

const Party = mongoose.model("Party", {
  name: String,
  size: Number,
  open: Boolean,
  players: [
    {
      nickname: String
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
      const party = await new Party({...action.party, open: true}).save();

      io.emit("action", await getParties());
      break;
    }
    case PARTY_JOIN: {
      const partyEdit = await Party.find({ name: action.party.name }).exec();
      if (partyEdit.players.length < partyEdit.size) {
        partyEdit.players.push(action.player).save();
        io.emit("action", await getParties());
      }
      break;
    }
  }
};

export default partyList;
