import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_BOARD_NOTIFY_GRID_UPDATE
} from '../../actionsTypes';
import { claimPieceSuccess } from '../../client/actions/game/pieces';
import { getTetri } from '../Tetri';
import { updateScore } from '../../client/actions/game/score';
import { Party } from './partyList';
import { updateParty } from '../../client/actions/party';

const game = async (action, io, socket) => {
  switch (action.type) {
    case GAME_PIECES_CLAIM_PIECE: {
      io.to(socket.partyId).emit('action', claimPieceSuccess(getTetri()));

      break;
    }

    case GAME_BOARD_NOTIFY_GRID_UPDATE: {
      if (!socket.partyId) return;

      socket.emit(
        'action',
        updateScore(
          action.payload.nbLinesDestroyed
            ? 100 + 500 * Math.pow(2, action.payload.nbLinesDestroyed - 1)
            : 100
        )
      );

      let party;
      try {
        party = await Party.findById(socket.partyId).exec();
      } catch (error) {
        console.error(error);
      }

      if (!party) return;

      party.players = party.players.map(player => {
        if (player.socketId === socket.id) {
          player.map = action.payload.grid;
        }

        return player;
      });

      try {
        await party.save();
        io.to(socket.partyId).emit('action', updateParty(party));
        // clearInterval(io.to(socket.partyId).partyInterval);
      } catch (error) {
        console.error(error);
      }

      break;
    }

    default:
      break;
  }
};

export default game;
