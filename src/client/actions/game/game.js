import {
  GAME_LOSE,
  GAME_NOTIFY_GAME_OVER,
  GAME_END
} from '../../../actionsTypes';

export const gameLose = () => (dispatch, getState) =>
  dispatch({
    type: GAME_LOSE,
    score: getState().game.score
  });

export const endGame = () => ({ type: GAME_END });
