import {
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES,
  GAME_BOARD_NOTIFY_GRID_UPDATE
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

const endAnimationSub = (board, grid, x, y) => {
  while (x >= 0) {
    grid[grid.length - 1 - y][grid[0].length - 1 - x] = 8;
    grid[y][x] = 8;
    x--;
    y--;
  }
  return grid;
};

export const endParty = board => (dispatch, getState) => {
  if (board.ending && getState().party.playing === true) {
    let newGrid = [...board.grid];
    let newBoard = { ...board, grid: newGrid };
    let x = 0;
    let y = board.grid.length - 1;
    let interval = setInterval(() => {
      if (getState().game.board.grid.end === false) {
        clearInterval(interval);
        return;
      }

      newBoard = { ...newBoard, grid: endAnimationSub(board, newGrid, x, y) };
      dispatch(updateBoard(newBoard));
      x++;
      if (x === board.grid[0].length) {
        y--;
        x--;
      }
      if (y < board.grid.length / 2) clearInterval(interval);
    }, 100);
  }
};
