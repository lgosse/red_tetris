import {
  GAME_BOARD_DELETE_LINES,
  GAME_PIECES_PIECE_MOVE,
  GAME_BOARD_UPDATE,
  GAME_LOSE,
  PARTY_LEFT,
  GAME_RESET
} from '../../../actionsTypes';
import {
  gridFusion,
  checkLines,
  testCollision,
  gridZero,
  deleteLines
} from './utils';
import { notifyGridUpdate } from '../../actions/game/board';
import { socket } from '../../index';

const initialState = {
  grid: gridZero(10, 20),
  ending: false,
  end: false,
  lines: null
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

    case GAME_LOSE: {
      return {
        ...state,
        ending: true,
        lines: null
      };
    }

    case PARTY_LEFT:
      return initialState;

    case GAME_RESET:
      return initialState;

    default:
      return state;
  }
};

export default board;
