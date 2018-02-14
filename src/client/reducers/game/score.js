import { GAME_SCORE_UPDATE, GAME_SCORE_RESET } from '../../../actionsTypes';

const score = (state = 0, action) => {
  switch (action.type) {
    case GAME_SCORE_RESET: {
      return action.score;
    }

    case GAME_SCORE_UPDATE: {
      return state + action.score;
    }

    default:
      return state;
  }
};

export default score;
