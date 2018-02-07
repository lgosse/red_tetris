import {
  GAME_BOARD_DELETE_LINES,
  GAME_PIECES_PIECE_MOVE,
  GAME_BOARD_UPDATE
} from '../../../actionsTypes';
import {
  gridFusion,
  checkLines,
  testCollision,
  gridZero,
  deleteLines
} from './utils';

const initialState = {
  grid: gridZero(10, 20)
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case GAME_BOARD_UPDATE:
      return {
        ...state,
        ...action.board
      };

    case GAME_BOARD_DELETE_LINES: {
      if (state.lines !== null) {
        const newGrid = deleteLines(state.grid, state.lines);
        return {
          ...state,
          grid: newGrid,
          lines: null
        };
      }

      return state;
    }

    case GAME_PIECES_PIECE_MOVE: {
      const pos = {
        x: action.piece.x + action.direction,
        y: action.direction === 0 ? action.piece.y + 1 : action.piece.y
      };

      const res = testCollision({ ...action.piece, ...pos }, state.grid);
      if (res.collide) {
        if (action.direction !== 0) return state;

        let newGrid = gridFusion(action.piece, state.grid);
        let lines = newGrid ? checkLines(newGrid) : null;

        if (newGrid === null) return { ...state, lines, ending: true };

        return {
          ...state,
          grid: newGrid,
          lines
        };
      }
    }

    default:
      return state;
  }
};

export default board;
