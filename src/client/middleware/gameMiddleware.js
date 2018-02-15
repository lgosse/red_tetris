import {
  GAME_PIECES_PIECE_MOVE_SERVER,
  GAME_PIECES_PIECE_ROTATE_SERVER,
  GAME_MODS_SET,
  GAME_BOARD_BLOCK_LINES_SERVER,
  GAME_MALUS_ADD
} from '../../actionsTypes';
import {
  updatePiecesGame,
  claimPiece,
  movePiece,
  rotatePiece,
  gameAddMalusSuccess
} from '../actions/game/pieces';
import {
  gridFusion,
  findPlace,
  testCollision,
  gridZero,
  checkLines,
  isMod,
  deleteLinesF,
  deleteTnt,
  deleteBomb
} from '../reducers/game/utils';
import {
  updateBoard,
  deleteLines,
  notifyGridUpdate,
  blockLines,
  tntExplode,
  tntExplode1,
  tntExplode2,
  bombExplode
} from '../actions/game/board';
import { gameLose } from '../actions/game/game';
import { setMod } from '../actions/game/mods';

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

    case GAME_BOARD_BLOCK_LINES_SERVER: {
      dispatch(blockLines(action.payload));

      break;
    }

    case GAME_MALUS_ADD: {
      if (getState().player.socketId !== action.payload.emitterSocketId) {
        dispatch(gameAddMalusSuccess(action.payload.malus));
      }
    }

    case GAME_MODS_SET: {
      const { game: { board: { grid } } } = getState();
      if (!action.mod || !action.mod.type) break;

      switch (action.mod.type) {
        case 'bomb': {
          const mod = action.mod;
          setTimeout(() => {
            dispatch(bombExplode(mod));
          }, 600);
          break;
        }

        case 'tnt': {
          const mod = action.mod;
          setTimeout(() => {
            dispatch(tntExplode1(mod));
          }, 5000);
          break;
        }

        case 'tntGo': {
          const mod = action.mod;
          setTimeout(() => {
            dispatch(tntExplode2(mod));
          }, 600);
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
