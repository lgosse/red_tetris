import {
  PLAYER_GET,
  PLAYER_SAVE,
  PLAYER_UPDATE,
  PLAYER_PIECE_ROTATE,
  PLAYER_PIECE_MOVE,
  PLAYER_DELETE_LINES,
  PLAYER_CLAIM_PIECE,
  PLAYER_CLAIM_PIECE_SUCCESS
} from '../../actionsTypes';

export const getPlayer = () => ({
  type: PLAYER_GET
});

export const updatePlayer = player => ({
  type: PLAYER_UPDATE,
  player
});

export const savePlayer = player => ({
  type: PLAYER_SAVE,
  player
});

export const rotatePiece = (player, direction) => ({
  type: PLAYER_PIECE_ROTATE,
  player,
  direction
});

export const claimPiece = partyId => ({
  type: PLAYER_CLAIM_PIECE,
  partyId
});

export const claimPieceSuccess = pieces => ({
  type: PLAYER_CLAIM_PIECE_SUCCESS,
  pieces
});

export const movePiece = direction => ({
  type: PLAYER_PIECE_MOVE,
  direction
});

export const deleteLines = () => ({
  type: PLAYER_DELETE_LINES
});
