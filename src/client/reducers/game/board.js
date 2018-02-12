import {
  GAME_BOARD_DELETE_LINES,
  GAME_PIECES_PIECE_MOVE,
  GAME_BOARD_UPDATE,
  GAME_LOSE,
  PARTY_LEFT,
  PARTY_START,
  GAME_HAS_FOCUS,
  GAME_LOSE_FOCUS
} from '../../../actionsTypes';
import {
  gridFusion,
  checkLines,
  testCollision,
  gridZero,
  deleteLinesF
} from './utils';
import { notifyGridUpdate } from '../../actions/game/board';
import { socket } from '../../index';

const initialState = {
  grid: gridZero(10, 20),
  ending: false,
  end: false,
  lines: null,
  winner: null,
  focus: false,
  hasFocusedOnce: false
};

const board = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GAME_BOARD_UPDATE:
      return {
        ...state,
        ...action.board
      };

    case GAME_BOARD_DELETE_LINES: {
      if (state.lines !== null) {
        const newGrid = deleteLinesF(state.grid, state.lines);
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

    case PARTY_START:
      return {
        ...state,
        grid: gridZero(10, 20),
        ending: false,
        end: false,
        lines: null,
        focus: false,
        hasFocusedOnce: false
      };

    case GAME_HAS_FOCUS:
      return {
        ...state,
        hasFocusedOnce: true,
        focus: true
      };

    case GAME_LOSE_FOCUS:
      return {
        ...state,
        focus: false
      };

    default:
      return state;
  }
};

export default board;
