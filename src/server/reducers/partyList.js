import { PARTY_LIST, RESPONSE_PARTY_LIST, PARTY_ADD } from "../../actionsTypes";
import Party from "../models/Party";

const getParties = state => {
  return {
    type: RESPONSE_PARTY_LIST,
    partyList: state
  };
};

const partyList = (state = [], action, io, socket) => {
  switch (action.type) {
    case PARTY_LIST: {
      const response = getParties(state);
      socket.emit("action", response);
      return response.parties;
    }

    case PARTY_ADD: {
      const party = {
        id: state.length || 0,
        ...action.party
      };
      const newState = [...state, new Party(party)];

      io.emit("action", {
        type: RESPONSE_PARTY_LIST,
        partyList: newState
      });

      return newState;
    }

    default: {
      return state;
    }
  }
};

export default partyList;
