import { PARTY_LIST, RESPONSE_PARTY_LIST, PARTY_ADD, PARTY_JOIN} from "../../actionsTypes";
import Party from "../models/Party";

const getParties = state => {
  console.log("---HERE---", state);
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
      return response.partyList;
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

    case PARTY_JOIN: {
      const newState = state.map(elem => {
        if (elem.name === action.party.name) {
          return {
            ...elem,
            players: [
              ...elem.players,
              action.player
            ]
          };
        }
        return (elem);
      });
      io.emit("action", {
        type: RESPONSE_PARTY_LIST,
        partyList: newState
      });
      console.log("newstate", newState);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default partyList;
