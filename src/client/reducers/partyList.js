import { PARTY_LIST, RESPONSE_PARTY_LIST } from "../../actionsTypes";

const partyList = (state = [], action) => {
  switch (action.type) {
    case PARTY_LIST:
      return state;

    case RESPONSE_PARTY_LIST:
      return action.partyList || [];

    default:
      return state;
  }
};

export default partyList;
