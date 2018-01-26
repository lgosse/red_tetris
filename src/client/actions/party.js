import {PARTY_GET, PARTY_SAVE, PARTY_ADD, PARTY_UPDATE, PARTY_JOIN} from "../../actionsTypes";

export const getParty = () => {
  return {
    type: PARTY_GET
  };
};

export const saveParty = party => {
  return {
    type: PARTY_SAVE,
    party
  };
};

export const addParty = party => {
  return {
    type: PARTY_ADD,
    party
  };
};

export const joinParty = (party, player) => {
  if (party.players.length < party.size) {
    return {
      type: PARTY_JOIN,
      party,
      player
    };
  }
  else {
    return {

    }
  }
};

export const updateParty = party => {
  return {
    type: PARTY_UPDATE,
    party
  };
};
