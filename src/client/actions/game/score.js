import { GAME_SCORE_UPDATE } from '../../../actionsTypes';

export const updateScore = score => ({
  type: GAME_SCORE_UPDATE,
  score
});
