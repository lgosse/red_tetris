import { GAME_SCORE_UPDATE, PARTY_START_SUCCESS } from '../../../actionsTypes';

const score = (state = 0, action) => {
  switch (action.type) {
    case PARTY_START_SUCCESS: {
      return 0;
    }

    case GAME_SCORE_UPDATE: {
      return state + action.score;
    }

    default:
      return state;
  }
};

export default score;
