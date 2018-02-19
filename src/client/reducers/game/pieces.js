import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_BONUS_ADD,
  GAME_MALUS_ADD_SUCCESS,
  GAME_PIECES_UPDATE,
  GAME_PIECE_UPDATE,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_PIECE_ROTATE_SUCCESS,
  GAME_LOSE,
  PARTY_LEFT,
  PARTY_START,
  GAME_END,
  GAME_PIECES_HOLD,
  GAME_PIECES_RESET_HOLD
} from '../../../actionsTypes';
import { gridFusion, findPlace, testCollision, gridZero } from './utils';

const initialState = {
  piece: null,
  next: [],
  hold: null,
  canHold: true
};

const pieces = (state = initialState, action) => {
  switch (action.type) {
    case GAME_PIECES_UPDATE: {
      return {
        ...state,
        ...action.pieces
      };
    }

    case GAME_PIECE_UPDATE: {
      return {
        ...state,
        piece: {
          ...state.piece,
          ...action.piece
        }
      };
    }

    case GAME_PIECES_PIECE_ROTATE_SUCCESS: {
      return {
        ...state,
        piece: action.piece
      };
    }

    case GAME_PIECES_PIECE_MOVE_SUCCESS: {
      return {
        ...state,
        piece: action.piece
      };
    }

    case GAME_PIECES_HOLD: {
      return {
        ...state,
        hold: {
          ...state.piece,
          x: 4,
          y: 0
        },
        piece: state.hold ? state.hold : state.next[0],
        next: state.hold ? state.next : state.next.slice(1),
        canHold: false
      };
    }

    case GAME_PIECES_RESET_HOLD:
      return {
        ...state,
        canHold: true
      };

    case GAME_PIECES_CLAIM_PIECE_SUCCESS: {
      return {
        ...state,
        next:
          state.next && state.next.length
            ? state.next.concat(action.pieces)
            : action.pieces
      };
    }

    case GAME_BONUS_ADD: {
      return {
        ...state,
        next:
          state.next && state.next.length
            ? [action.bonus, ...state.next]
            : [action.bonus]
      };
    }

    case GAME_MALUS_ADD_SUCCESS: {
      return {
        ...state,
        next:
          state.next && state.next.length
            ? [action.malus, ...state.next]
            : [action.malus]
      };
    }

    case GAME_LOSE: {
      return {
        ...state,
        piece: null
      };
    }

    case PARTY_LEFT:
      return initialState;

    case GAME_END:
      return initialState;

    default:
      return state;
  }
};

export default pieces;
