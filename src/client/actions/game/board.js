import {
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES
} from '../../../actionsTypes';

export const updateBoard = board => ({
  type: GAME_BOARD_UPDATE,
  board
});

export const deleteLines = () => ({
  type: GAME_BOARD_DELETE_LINES
});
