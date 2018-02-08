import {
  GAME_BOARD_UPDATE,
  GAME_BOARD_DELETE_LINES,
  GAME_BOARD_NOTIFY_GRID_UPDATE,
  GAME_BOARD_BLOCK_LINES_SERVER
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

export const blockLinesServer = (nbLines, except) => ({
  type: GAME_BOARD_BLOCK_LINES_SERVER,
  payload: {
    nbLines,
    except
  }
});

export const blockLines = ({ nbLines, except }) => (dispatch, getState) => {
  console.group('BLOCKLINES');
  const state = getState();
  const socketId = state.player.socketId;
  const grid = state.game.board.grid;
  console.log('[EXCEPT]', except);
  console.log('[NBLINES]', nbLines);
  console.log('[SOCKETID]', socketId);
  console.log('[OLDGRID]', grid);
  console.log(
    '[NEWGRID]',
    grid
      .slice(nbLines)
      .concat(
        [...Array(nbLines)].map(_ => [...Array(grid[0].length)].map(_ => -1))
      )
  );
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
  console.groupEnd('BLOCKLINES');
};
