import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  PARTY_ADD,
  ALERT_POP
} from "../../actionsTypes";
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
      try {
        const party = await new Party({ ...action.party, open: true }).save();
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
        console.log(error.code);
        socket.emit("action", {
          type: ALERT_POP,
          message
        });

        break;
      }
      io.emit("action", await getParties());

      break;
    }
  }
};

export default partyList;
