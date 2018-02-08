import {
  GAME_PIECES_PIECE_MOVE_SERVER,
  GAME_PIECES_PIECE_ROTATE_SERVER,
  GAME_MODS_SET
} from '../../actionsTypes';
import {
  updatePiecesGame,
  claimPiece,
  movePiece,
  rotatePiece
} from '../actions/game/pieces';
import {
  gridFusion,
  findPlace,
  testCollision,
  gridZero,
  checkLines,
  isMod,
  deleteLinesF
} from '../reducers/game/utils';
import {
  updateBoard,
  deleteLines,
  notifyGridUpdate
} from '../actions/game/board';
import { gameLose } from '../actions/game/game';

const gameMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case GAME_PIECES_PIECE_MOVE_SERVER: {
      dispatch(movePiece(action.direction));

      break;
    }

    case GAME_PIECES_PIECE_ROTATE_SERVER: {
      dispatch(rotatePiece(action.direction));

      break;
    }

    case GAME_MODS_SET: {
      const { game: { board: { grid } } } = getState();
      if (!action.mod || !action.mod.do) break;

      switch (action.mod.type) {
        case 'bomb': {
          let newGrid = deleteLinesF(grid, [action.mod.y]);
          newGrid = newGrid.map(line => {
            line[action.mod.x] = 0;
          });
          dispatch(updateBoard({ grid: newGrid }));
          break;
        }
        default:
          break;
      }

      break;
    }

    default:
      break;
  }

  return next(action);
};

export default gameMiddleware;
