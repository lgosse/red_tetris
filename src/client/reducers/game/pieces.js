import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_PIECES_CLAIM_PIECE_SUCCESS,
  GAME_PIECES_UPDATE,
  GAME_PIECES_PIECE_MOVE_SUCCESS,
  GAME_PIECES_PIECE_ROTATE_SUCCESS
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
      // let newGrid = gridZero(state.piece.grid.length);

      // state.piece.grid.forEach((line, y) => {
      //   line.forEach((col, x) => {
      //     newGrid[
      //       y +
      //         (state.piece.grid.length - 1) * ((1 - action.direction) / 2) +
      //         action.direction * x -
      //         y
      //     ][
      //       x +
      //         (state.piece.grid.length - 1) * ((action.direction + 1) / 2) -
      //         x -
      //         y * action.direction
      //     ] = col;
      //   });
      // });

      // const pos = findPlace({ ...state.piece, grid: newGrid }, action.grid, 0);
      // if (pos === null) {
      //   return state;
      // } else {
      //   return {
      //     ...state,
      //     piece: {
      //       ...state.piece,
      //       grid: newGrid,
      //       ...pos
      //     }
      //   };
      // }
      return {
        ...state,
        piece: action.piece
      };
    }

    case GAME_PIECES_PIECE_MOVE_SUCCESS: {
      // if (!action.piece) return state;
      // const pos = {
      //   x: action.piece.x + action.direction,
      //   y: action.direction === 0 ? action.piece.y + 1 : action.piece.y
      // };

      // if (!testCollision({ ...action.piece, ...pos }, action.grid).collide) {
      //   return {
      //     ...state,
      //     piece: {
      //       ...action.piece,
      //       ...pos
      //     }
      //   };
      // } else if (action.direction === 0) {
      //   return {
      //     ...state,
      //     piece: state.next[0],
      //     next: state.next.slice(1)
      //   };
      // }

      // return state;
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

    default:
      return state;
  }
};

export default pieces;
