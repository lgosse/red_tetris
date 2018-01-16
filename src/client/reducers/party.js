import { PARTY_LIST, RESPONSE_PARTY_LIST } from "../../actionsTypes";

const partyList = {
  room1: "toto",
  room2: "lulu"
};

const extractParties = parties => {
  return { partyList: parties.map(party => party) };
};

const party = (state = {}, action) => {
  switch (action.type) {
    case PARTY_LIST:
      return state;
    case RESPONSE_PARTY_LIST:
      return extractParties(action.parties);
    default:
      return state;
  }
};

export default party;
