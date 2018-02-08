import {
  GAME_BOARD_DELETE_LINES,
  GAME_PIECES_PIECE_MOVE,
  GAME_BOARD_UPDATE
} from "../../../actionsTypes";
import {
  gridFusion,
  checkLines,
  testCollision,
  gridZero,
  deleteLinesF
} from "./utils";
import { notifyGridUpdate } from "../../actions/game/board";
import { socket } from "../../index";

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
        const newGrid = deleteLinesF(state.grid, state.lines);
        return {
          ...state,
          grid: newGrid,
          lines: null
        };
      }

      return state;
    }

    // case GAME_PIECES_PIECE_MOVE_SUCCESS: {
    //   // if (!action.piece) return state;
    //   // const pos = {
    //   //   x: action.piece.x + action.direction,
    //   //   y: action.direction === 0 ? action.piece.y + 1 : action.piece.y
    //   // };

    //   // const res = testCollision({ ...action.piece, ...pos }, action.grid);
    //   // if (res.collide) {
    //   //   if (action.direction !== 0) return state;

    //   //   let newGrid = gridFusion(action.piece, action.grid);
    //   //   let lines = newGrid ? checkLines(newGrid) : null;

    //   //   if (newGrid === null) return { ...state, lines, ending: true };

    //   //   socket.emit(
    //   //     'action',
    //   //     notifyGridUpdate(newGrid, lines ? lines.length : 0)
    //   //   );

    //   //   return {
    //   //     ...state,
    //   //     grid: newGrid,
    //   //     lines
    //   //   };
    //   // } else {
    //   //   return state;
    //   // }
    // }

    default:
      return state;
  }
};

export default board;
