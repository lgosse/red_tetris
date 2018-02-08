import {
  PARTY_GET,
  PARTY_SAVE,
  PARTY_UPDATE,
  PARTY_LEFT
} from '../../actionsTypes';

const getParty = () => {
  const partyItem = localStorage.getItem('party');
  if (partyItem) {
    return JSON.parse(partyItem);
  }
  return {};
};

const saveParty = action => {
  localStorage.setItem('party', JSON.stringify(action.party));
};

const party = (state = { size: 10, players: [] }, action) => {
  switch (action.type) {
    case PARTY_GET:
      return getParty();
    case PARTY_SAVE:
      saveParty(action);
      return state;
    case PARTY_UPDATE:
      return action.party;
    case PARTY_LEFT:
      return { size: 10, players: [] };
    default:
      return state;
  }
};

export default party;
