import { GAME_SCORE_UPDATE, GAME_SCORE_RESET } from '../../../actionsTypes';

export const resetScore = score => ({
  type: GAME_SCORE_RESET,
  score
});

export const updateScore = score => ({
  type: GAME_SCORE_UPDATE,
  score
});
