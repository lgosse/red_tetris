import {
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES,
  GAME_BOARD_NOTIFY_GRID_UPDATE,
  GAME_BOARD_BLOCK_LINES_SERVER,
  GAME_HAS_FOCUS,
  GAME_LOSE_FOCUS,
  GAME_BOARD_DELETE_LINES_SOUND
} from '../../../actionsTypes';
import { setMod } from './mods';
import { deleteTnt, deleteBomb } from '../../reducers/game/utils';

export const gridHasFocus = () => ({
  type: GAME_HAS_FOCUS
});

export const gridLoseFocus = () => ({
  type: GAME_LOSE_FOCUS
});

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

export const deleteLinesSound = () => ({
  type: GAME_BOARD_DELETE_LINES_SOUND
});

const endAnimationSub = (board, grid, x, y) => {
  while (x >= 0) {
    grid[grid.length - 1 - y][grid[0].length - 1 - x] = 13;
    grid[y][x] = 13;
    x--;
    y--;
  }
  return grid;
};

export const showEnd = () => (dispatch, getState) => {
  dispatch(updateBoard({ end: true }));
  setTimeout(() => dispatch(updateBoard({ end: false })), 1500);
};

export const endParty = board => (dispatch, getState) => {
  if (getState().party.playing === true) {
    let newGrid = [...board.grid];
    let newBoard = { ...board, grid: newGrid };
    let x = 0;
    let y = board.grid.length - 1;
    let interval = setInterval(() => {
      if (getState().game.board.end === true) {
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
      if (y < board.grid.length / 2) {
        clearInterval(interval);
        dispatch(showEnd());
      }
    }, 100);
  }
};

export const blockLinesServer = (nbLines, except) => ({
  type: GAME_BOARD_BLOCK_LINES_SERVER,
  payload: {
    nbLines,
    except
  }
});

export const blockLines = ({ nbLines, except }) => (dispatch, getState) => {
  const state = getState();
  const socketId = state.player.socketId;
  const grid = state.game.board.grid;

  if (except === socketId) return;

  dispatch(
    updateBoard({
      grid: grid
        .slice(nbLines)
        .concat(
          [...Array(nbLines)].map(_ => [...Array(grid[0].length)].map(_ => -1))
        )
    })
  );
  dispatch(notifyGridUpdate(getState().game.board.grid, 0));
};

export const bombExplode = mod => (dispatch, getState) => {
  const newGrid = deleteBomb(mod, getState().game.board.grid);
  dispatch(
    updateBoard({
      grid: newGrid
    })
  );
  dispatch(notifyGridUpdate(newGrid, 1));
  dispatch(setMod(null));
};

export const tntExplode1 = mod => (dispatch, getState) => {
  const tnt = { ...mod, type: 'tntGo' };
  dispatch(setMod(tnt));
};

export const tntExplode2 = mod => (dispatch, getState) => {
  const newGrid = deleteTnt(mod, getState().game.board.grid);
  dispatch(
    updateBoard({
      grid: newGrid
    })
  );
  dispatch(notifyGridUpdate(newGrid, 1));
  dispatch(setMod(null));
};
