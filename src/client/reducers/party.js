import { PARTY_GET, PARTY_SAVE, PARTY_ADD, PARTY_UPDATE, PARTY_JOIN } from "../../actionsTypes";

const getParty = () => {
  const partyItem = localStorage.getItem("party");
  console.log(partyItem);
  console.log(localStorage);
  if (partyItem !== null) {
    return JSON.parse(partyItem);
  }
  return {};
};

const saveParty = action => {
  localStorage.setItem("party", JSON.stringify(action.party));
};

const party = (state = { size: 10 }, action) => {
  switch (action.type) {
    case PARTY_GET:
      return getParty();
    case PARTY_SAVE:
      saveParty(action);
      return action.party;
    case PARTY_ADD:
      return action.party;
    case PARTY_UPDATE:
      return action.party;
    case PARTY_JOIN: {
      return {
        ...state,
        players: [
          ...state.players,
          action.player
        ]
      }
    }
    default:
      return state;
  }
};

export default party;
