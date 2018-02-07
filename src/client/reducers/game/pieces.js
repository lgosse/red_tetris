import {
  GAME_PIECES_PIECE_ROTATE,
  GAME_PIECES_PIECE_MOVE,
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_PIECES_UPDATE
} from '../../../actionsTypes';
import { gridFusion, findPlace, testCollision, gridZero } from './utils';

const pieces = (state = {}, action) => {
  switch (action.type) {
    case GAME_PIECES_UPDATE: {
      return {
        ...state,
        ...action.pieces
      };
    }

    case GAME_PIECES_PIECE_ROTATE: {
      let newGrid = gridZero(state.piece.grid.length);

      state.piece.grid.forEach((line, y) => {
        line.forEach((col, x) => {
          newGrid[
            y +
              (state.piece.grid.length - 1) * ((1 - action.direction) / 2) +
              action.direction * x -
              y
          ][
            x +
              (state.piece.grid.length - 1) * ((action.direction + 1) / 2) -
              x -
              y * action.direction
          ] = col;
        });
      });

      const pos = findPlace({ ...state.piece, grid: newGrid }, action.grid, 0);
      if (pos === null) {
        return state;
      } else {
        return {
          ...state,
          piece: {
            ...state.piece,
            grid: newGrid,
            ...pos
          }
        };
      }
    }

    case GAME_PIECES_PIECE_MOVE: {
      const pos = {
        x: state.piece.x + action.direction,
        y: action.direction === 0 ? state.piece.y + 1 : state.piece.y
      };

      if (!testCollision({ ...state.piece, ...pos }, action.grid).collide) {
        return {
          ...state,
          piece: {
            ...state.piece,
            ...pos
          }
        };
      } else if (action.direction === 0) {
        return {
          ...state,
          piece: null
        };
      }

      return state;
    }

    case GAME_PIECES_CLAIM_PIECE: {
      return {
        ...state,
        piece: state.next[0],
        next: state.next.slice(1)
      };
    }

    case GAME_PIECES_CLAIM_PIECE_SUCCESS: {
      return {
        ...state,
        next: state.next ? state.next.concat(action.pieces) : action.pieces
      };
    }

    default:
      return state;
  }
};

export default pieces;
