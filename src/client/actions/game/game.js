import { GAME_LOSE, GAME_NOTIFY_GAME_OVER } from '../../../actionsTypes';

export const gameLose = () => (dispatch, getState) =>
  dispatch({
    type: GAME_LOSE,
    score: getState().game.score
  });

export const notifyGameOver = playerName => ({
  type: GAME_NOTIFY_GAME_OVER,
  playerName
});
