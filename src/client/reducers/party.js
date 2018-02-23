import {
  PARTY_GET,
  PARTY_SAVE,
  PARTY_UPDATE,
  PARTY_LEFT,
  PARTY_RECEIVE_MESSAGE,
  GAME_END,
  PARTY_TOGGLE_RULES
} from '../../actionsTypes';
import { gridZero } from './game/utils';

const saveParty = action => {
  localStorage.setItem('party', JSON.stringify(action.party));
};

const initialState = {
  size: 10,
  players: [],
  messages: [],
  withBonus: false,
  showRules: false
};

const party = (state = initialState, action) => {
  switch (action.type) {
    case PARTY_UPDATE: {
      return {
        ...state,
        ...action.party
      };
    }

    case PARTY_LEFT: {
      return initialState;
    }

    case GAME_END: {
      return {
        ...state,
        players: state.players.map(player => ({
          ...player,
          map: gridZero(10, 20)
        })),
        playing: false
      };
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

    case PARTY_TOGGLE_RULES: {
      return {
        ...state,
        showRules: !state.showRules
      };
    }

    default:
      return state;
  }
};

export default party;
