// Models
import GameModel from '../models/Game';
import RankingModel, { Ranking } from '../models/Ranking';

// Action Types
import {
  GAME_PIECES_CLAIM_PIECE,
  GAME_BOARD_NOTIFY_GRID_UPDATE,
  GAME_LOSE
} from '../../actionsTypes';

// Actions
import {
  claimPieceSuccess,
  gameAddBonus,
  gameAddMalus,
  updatePiecesGame,
  updateCurrentPiece
} from '../../client/actions/game/pieces';
import { Piece, PieceBonus, PieceMalus } from '../models/Piece';
import { updateScore } from '../../client/actions/game/score';
import { updateParty } from '../../client/actions/party';
import { alert } from '../../client/actions/alert';
import { gridZero } from '../../client/reducers/game/utils';
import { resetGame, blockLinesServer } from '../../client/actions/game/board';

import {
  notifyGameOver,
  endGame,
  displayEnd
} from '../../client/actions/game/game';
import { getRankingListSuccess } from '../../client/actions/rankings';
import { updatePlayer } from '../../client/actions/player';

const game = async (action, io, socket) => {
  switch (action.type) {
    case GAME_PIECES_CLAIM_PIECE: {
      io.to(socket.partyId).emit('action', claimPieceSuccess(new Piece()));

      break;
    }

    case GAME_BOARD_NOTIFY_GRID_UPDATE: {
      if (!socket.partyId) return;

      let party;
      try {
        party = await GameModel.findById(socket.partyId).exec();
      } catch (error) {
        console.error(error);
      }

      if (!party || !party.playing) return;

      const addScore = action.payload.nbLinesDestroyed
        ? 100 + 500 * Math.pow(2, action.payload.nbLinesDestroyed - 1)
        : 100;

      party.incrementPlayerScore(socket.id, addScore);

      socket.emit('action', updateScore(addScore));

      if (action.payload.nbLinesDestroyed - 1 > 0) {
        io.to(socket.partyId).emit('action', updateCurrentPiece({ y: 0 }));
        io
          .to(socket.partyId)
          .emit(
            'action',
            blockLinesServer(action.payload.nbLinesDestroyed - 1, socket.id)
          );
      }

      if (action.payload.nbLinesDestroyed > 2 && party.withBonus) {
        if (Math.trunc(Math.random() * 2) === 0 || party.solo) {
          socket.emit('action', gameAddBonus(new PieceBonus()));
        } else {
          io
            .to(party._id)
            .emit('action', gameAddMalus(socket.id, new PieceMalus()));
        }
      }

      party.updatePlayer({
        socketId: socket.id,
        map: action.payload.grid
      });

      try {
        await party.save();
        io
          .to(socket.partyId)
          .emit('action', updateParty({ players: party.players }));
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

      if (!party) {
        socket.emit(
          'action',
          alert('An error occured, refresh and try again.')
        );

        return;
      }

      party.updatePlayer({
        socketId: socket.id,
        lose: true
      });

      if (party.isOver()) {
        if (party.solo === true) {
          try {
            await new RankingModel(
              new Ranking({
                score: action.score + 100,
                playerName: party.getPlayerBySocketId(socket.id).nickname
              })
            ).save();
          } catch (error) {
            console.error(error);
          }
        } else {
          const winner = party.findAlivePlayers()[0];

          io
            .to(party._id)
            .emit('action', alert(`${winner.nickname} has won the game!`));
          io.to(party._id).emit('action', displayEnd(winner));
        }

        clearInterval(io.to(party._id).partyInterval);
        party.stopGame();
        party.clearPlayersBoard();
        io.to(party._id).emit('action', updatePlayer({ ready: false }));
        io
          .to(party._id)
          .emit('action', updateParty({ players: party.players }));
        try {
          party.save();
        } catch (error) {
          console.error(error);
        }
        setTimeout(() => {
          io.to(party._id).emit('action', endGame());
        }, 3000);
      } else {
        try {
          await party.save();
        } catch (error) {
          console.error(error);
        }
        io
          .to(party._id)
          .emit('action', updateParty({ players: party.players }));
      }

      break;
    }

    default:
      break;
  }
};

export default game;
