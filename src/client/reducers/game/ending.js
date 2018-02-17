import { GAME_DISPLAY_END, GAME_HIDE_END } from '../../../actionsTypes';

const initialState = {
  winner: null,
  players: [],
  shouldDisplay: false
};

const ending = (state = initialState, action) => {
  switch (action.type) {
    case GAME_DISPLAY_END: {
      return {
        winner: action.payload.winner,
        players: action.payload.players,
        shouldDisplay: true
      };
    }

    case GAME_HIDE_END:
      return initialState;

    default:
      return state;
  }
};

export default ending;
