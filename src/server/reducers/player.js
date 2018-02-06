import { PLAYER_CLAIM_PIECE } from '../../actionsTypes';
import { claimPieceSuccess } from '../../client/actions/player';
import { getTetri } from '../Tetri';

const player = (action, io, socket) => {
  switch (action.type) {
    case PLAYER_CLAIM_PIECE: {
      io.to(action.partyId).emit('action', claimPieceSuccess(getTetri()));

      break;
    }

    default:
      break;
  }
};

export default player;
