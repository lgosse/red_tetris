import {PARTY_ADD, PARTY_UPDATE} from "../../actionsTypes";

export const addParty = party => {
  return {
    type: PARTY_ADD,
    party
  };
};

export const updateParty = party => {
  return {
    type: PARTY_UPDATE,
    party
  };
};
