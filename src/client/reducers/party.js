import {
  PARTY_GET,
  PARTY_SAVE,
  PARTY_UPDATE,
  PARTY_LEFT,
  PARTY_RECEIVE_MESSAGE
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

const initialState = { size: 10, players: [], messages: [], withBonus: false };

const party = (state = initialState, action) => {
  switch (action.type) {
    case PARTY_GET: {
      return getParty();
    }

    case PARTY_SAVE: {
      saveParty(action);
      return state;
    }

    case PARTY_UPDATE: {
      return {
        ...state,
        ...action.party
      };
    }

    case PARTY_LEFT: {
      return initialState;
    }

    case PARTY_RECEIVE_MESSAGE: {
      return {
        ...state,
        messages:
          state.messages && state.messages.length
            ? [...state.messages, action.message]
            : [action.message]
      };
    }

    default:
      return state;
  }
};

export default party;
