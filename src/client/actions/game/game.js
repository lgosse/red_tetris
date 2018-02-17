import {
  GAME_LOSE,
  GAME_NOTIFY_GAME_OVER,
  GAME_END,
  GAME_DISPLAY_END,
  GAME_HIDE_END
} from '../../../actionsTypes';

export const gameLose = () => (dispatch, getState) =>
  dispatch({
    type: GAME_LOSE,
    score: getState().game.score
  });

export const endGame = () => ({ type: GAME_END });

export const displayEnd = winner => ({
  type: GAME_DISPLAY_END,
  winner
});

export const hideEnd = () => ({
  type: GAME_HIDE_END
});
