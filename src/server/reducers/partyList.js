import { PARTY_LIST, RESPONSE_PARTY_LIST } from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import { setTimeout } from "timers";

const getParties = state => {
  return {
    type: RESPONSE_PARTY_LIST,
    parties: [{ name: "toto" }]
    // parties: state.partyList
  };
};

const partyList = (state = [], action, io, socket) => {
  switch (action.type) {
    case PARTY_LIST:
      const response = getParties();
      socket.emit("action", response);
      return response.parties;
    // return state
    default:
      return state;
  }
};

export default partyList;
