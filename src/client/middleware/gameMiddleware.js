import {
  GAME_PIECES_PIECE_MOVE_SERVER,
  GAME_PIECES_PIECE_ROTATE_SERVER,
  GAME_MODS_SET,
  GAME_BOARD_BLOCK_LINES_SERVER,
  GAME_MALUS_ADD,
  GAME_PIECES_CLAIM_PIECE,
  GAME_LOSE,
  PARTY_START_SUCCESS,
  GAME_BONUS_ADD,
  GAME_BOARD_DELETE_LINES,
  GAME_BOARD_DELETE_LINES_SOUND
} from "../../actionsTypes";
import {
  updatePiecesGame,
  claimPiece,
  movePiece,
  rotatePiece,
  gameAddMalusSuccess
} from "../actions/game/pieces";
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
} from "../reducers/game/utils";
import {
  updateBoard,
  deleteLines,
  notifyGridUpdate,
  blockLines,
  tntExplode,
  tntExplode1,
  tntExplode2,
  bombExplode
} from "../actions/game/board";
import { gameLose } from "../actions/game/game";
import Beep1 from "../../media/Beep1.wav";
import ShutDown1 from "../../media/Shut_Down1.wav";
import Explosion3 from "../../media/Explosion3.wav";
import Explosion4 from "../../media/Explosion4.wav";
import DeleteLines from "../../media/DeleteLines.wav";
import { createPlayer } from "../../media/playSound";

const gameMiddleware = ({ dispatch, getState }) => next => action => {
  const playSound = createPlayer(getState().music);

  switch (action.type) {
    case GAME_BOARD_BLOCK_LINES_SERVER: {
      dispatch(blockLines(action.payload));

      break;
    }

    case GAME_MALUS_ADD: {
      if (getState().player.socketId !== action.payload.emitterSocketId) {
        dispatch(gameAddMalusSuccess(action.payload.malus));
      }

      break;
    }

    case GAME_BOARD_DELETE_LINES_SOUND: {
      playSound(DeleteLines);

      break;
    }

    case GAME_PIECES_CLAIM_PIECE: {
      playSound(Beep1);

      break;
    }

    case GAME_LOSE: {
      playSound(ShutDown1);

      break;
    }

    case PARTY_START_SUCCESS: {
      const partyInterval = setInterval(() => {
        if (!getState().party.playing) {
          clearInterval(partyInterval);

          return;
        }

        dispatch(movePiece(0));
      }, 1000);

      break;
    }

    case GAME_MODS_SET: {
      const { game: { board: { grid } } } = getState();
      if (!action.mod || !action.mod.type) break;

      switch (action.mod.type) {
        case "bomb": {
          const mod = action.mod;
          playSound(Explosion3);
          setTimeout(() => {
            dispatch(bombExplode(mod));
          }, 600);
          break;
        }

        case "tnt": {
          const mod = action.mod;
          setTimeout(() => {
            dispatch(tntExplode1(getState().game.mods[mod.id]));
          }, 5000);
          break;
        }

        case "tntGo": {
          const mod = action.mod;
          playSound(Explosion4);
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
