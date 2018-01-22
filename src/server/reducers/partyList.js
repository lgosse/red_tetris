import { PARTY_LIST, RESPONSE_PARTY_LIST, PARTY_ADD } from "../../actionsTypes";
import Party from '../models/Party';

const getParties = state => {
  return {
    type: RESPONSE_PARTY_LIST,
    parties: state
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
      const id = state.length;
      const newState = [
        ...state,
        new Party(id, action.party)
      ];

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
