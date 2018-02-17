import { GAME_DISPLAY_END, GAME_HIDE_END } from '../../../actionsTypes';

const initialState = {
  winner: null,
  shouldDisplay: false
};

const ending = (state = initialState, action) => {
  switch (action.type) {
    case GAME_DISPLAY_END: {
      return {
        winner: action.winner,
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
