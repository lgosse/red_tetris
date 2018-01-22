import { PARTY_ADD } from "../../actionsTypes";

const party = (state = {}, action, io, socket) => {
  switch (action.type) {
    case PARTY_ADD:
      socket.emit("action", state);
      return state;
    default:
      return state;
  }
};

export default party;
