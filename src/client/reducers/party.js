import { PARTY_ADD, PARTY_UPDATE } from "../../actionsTypes";

const party = (state = { size: 10 }, action) => {
  switch (action.type) {
    case PARTY_ADD:
      return action.party;
    case PARTY_UPDATE:
      return action.party;
    default:
      return state;
  }
};

export default party;
