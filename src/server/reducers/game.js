// Models
import GameModel from '../models/Game';
import Player from '../models/Player';

// Action Types
import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_BOARD_NOTIFY_GRID_UPDATE,
  GAME_LOSE
} from '../../actionsTypes';

// Actions
import { claimPieceSuccess } from '../../client/actions/game/pieces';
import { getTetri } from '../Tetri';
import { updateScore } from '../../client/actions/game/score';
import { updateParty } from '../../client/actions/party';
import { alert } from '../../client/actions/alert';
import { gridZero } from '../../client/reducers/game/utils';
import { resetGame, blockLinesServer } from '../../client/actions/game/board';

import mongoose from 'mongoose';

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

      if (action.payload.nbLinesDestroyed - 1 > 0) {
        io
          .to(socket.partyId)
          .emit(
            'action',
            blockLinesServer(action.payload.nbLinesDestroyed - 1, socket.id)
          );
      }

      let party;
      try {
        party = await GameModel.findById(socket.partyId).exec();
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
      } catch (error) {
        console.error(error);
      }

      break;
    }

    case GAME_LOSE: {
      let party;
      try {
        party = await GameModel.findById(socket.partyId).exec();
      } catch (error) {
        console.error(error);
      }

      if (!party)
        socket.emit(
          'action',
          alert('An error occured, refresh and try again.')
        );

      party.updatePlayer({
        socketId: socket.id,
        map: gridZero(10, 20),
        lose: true
      });

      if (
        party.findAlivePlayers().length >= party.players.length - 1 &&
        party.solo === false
      ) {
        io.to(party._id).emit('action', alert('PLAYER HAS WON'));
        clearInterval(io.to(party._id).partyInterval);
        setTimeout(async () => {
          party.playing = false;
          try {
            await party.save();
            io.to(party._id).emit('action', updateParty(party));
          } catch (error) {
            console.error(error);
          }
        }, 5000);
      } else if (party.solo === true) {
        party.stopGame();
        try {
          await party.save();
          clearInterval(io.to(party._id).partyInterval);
          io.to(party._id).emit('action', updateParty(party));
        } catch (error) {
          console.error(error);
        }

        // @TODO save score
      }

      try {
        await party.save();
        io.to(party._id).emit('action', updateParty(party));
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
