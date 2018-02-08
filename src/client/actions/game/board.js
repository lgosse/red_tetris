import {
  GAME_LOSE,
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES,
  GAME_BOARD_NOTIFY_GRID_UPDATE,
  GAME_RESET
} from '../../../actionsTypes';

export const updateBoard = board => ({
  type: GAME_BOARD_UPDATE,
  board
});

export const notifyGridUpdate = (grid, nbLinesDestroyed) => ({
  type: GAME_BOARD_NOTIFY_GRID_UPDATE,
  payload: {
    grid,
    nbLinesDestroyed
  }
});

export const deleteLines = () => ({
  type: GAME_BOARD_DELETE_LINES
});

export const gameLose = () => ({
  type: GAME_LOSE
});

export const resetGame = () => ({
  type: GAME_RESET
});
