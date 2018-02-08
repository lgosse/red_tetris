import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_PIECES_UPDATE,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_PIECE_ROTATE_SUCCESS,
  GAME_LOSE,
  PARTY_LEFT,
  PARTY_START
} from '../../../actionsTypes';
import { gridFusion, findPlace, testCollision, gridZero } from './utils';

const initialState = {};

const pieces = (state = initialState, action) => {
  switch (action.type) {
    case GAME_PIECES_UPDATE: {
      return {
        ...state,
        ...action.pieces
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

    case GAME_PIECES_CLAIM_PIECE_SUCCESS: {
      return {
        ...state,
        next: state.next ? state.next.concat(action.pieces) : action.pieces
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

    case PARTY_START:
      return {
        piece: null,
        next: []
      };

    default:
      return state;
  }
};

export default pieces;
